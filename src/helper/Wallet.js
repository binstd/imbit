import * as keychain from './Keychain';
import 'ethers/dist/shims.js';
import { ethers } from 'ethers';
// import { RNUportHDSigner } from 'react-native-uport-signer';
import {
    ACCESS_CONTROL,
    ACCESSIBLE,
    AUTHENTICATION_TYPE,
    canImplyAuthentication,
} from 'react-native-keychain';


import HDWallet from './hdwallet/HDWallet';
import walletUtils from './hdwallet/walletUtils';

const seedPhraseKey = 'openWalletSeedPhrase';
const privateKeyKey = 'openWalletPrivateKey';
const addressKey = 'openWalletAddressKey';

import UserStore from '../model/UserStore';
import {ALLOW_NETWORK} from './Config';

export const walletInit = async (seedPhrase = null) => {
    let walletAddress = null;
    let isWalletBrandNew = false;
    if (seedPhrase) {
        walletAddress = await createWallet(seedPhrase);
    }
    if (!walletAddress) {
        walletAddress = await loadAddress();
    }
    if (!walletAddress) {
        walletAddress = await createWallet();
        // console.log('walletAddress:',walletAddress);
        isWalletBrandNew = true;
    }
    console.log('\n wallet-Address:',walletAddress);
    console.log('\n typeof-wallet:', typeof walletAddress);
    
    return { isWalletBrandNew, walletAddress };
};


// //通过 助记词 创建钱包 
const createWallet = async (seedPhrase) => {
    const walletSeedPhrase = seedPhrase || await walletUtils.generateMnemonic(); 
    const seed = walletUtils.mnemonicToSeed(walletSeedPhrase);
    var hdwallet = HDWallet.fromMasterSeed(seed);
    hdwallet.setDerivePath("m/44'/60'/0'/0/0");
    const address = hdwallet.getChecksumAddressString();
    const privateKey = hdwallet.getPrivateKeyString();
    saveWalletDetails(walletSeedPhrase, privateKey, address);
    return address;
};


// 保存   
const saveWalletDetails = async (seedPhrase, privateKey, address) => {
    console.log('seedPhrase, privateKey, address:',seedPhrase, privateKey, address);
    const canAuthenticate = await canImplyAuthentication({ authenticationType: AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS });
    console.log('canAuthenticate',canAuthenticate);
    let accessControlOptions = {};
    if (canAuthenticate) {
        accessControlOptions = { accessControl: ACCESS_CONTROL.USER_PRESENCE, accessible: ACCESSIBLE.WHEN_UNLOCKED };
        console.log('accessControlOptions',accessControlOptions);
    }
    saveSeedPhrase(seedPhrase, accessControlOptions);
    savePrivateKey(privateKey, accessControlOptions);
    saveAddress(address);
};


//保存种子
const saveSeedPhrase = async (seedPhrase, accessControlOptions = {}) => {
    console.log(1);
    await keychain.saveString(seedPhraseKey, seedPhrase, accessControlOptions);
};

//保存私钥
const savePrivateKey = async (privateKey, accessControlOptions = {}) => {
    console.log(2);
    await keychain.saveString(privateKeyKey, privateKey, accessControlOptions);
};


//保存地址
const saveAddress = async (address) => {
    console.log(3);
    await keychain.saveString(addressKey, address);
};

//载入私钥
export  const loadPrivateKey = async (authenticationPrompt) => {
    try {
        const privateKey = await keychain.loadString(privateKeyKey, { authenticationPrompt });
        console.log(privateKey);
        return privateKey;
    } catch (error) {
        console.log('meiyou!');
        return null;
    }
};

//载入地址
export const loadAddress = async () => {
    try {
        return await keychain.loadString(addressKey);
        console.log('eychain.loadString(addressKey)');
    } catch (error) {
        console.log(" } catch (error) {");
        return null;
    }
};

//载入助记词
export const loadSeedPhrase = async (authenticationPrompt) => {
    const seedPhrase = await keychain.loadString(seedPhraseKey, { authenticationPrompt });
    return seedPhrase;
};

export const removeWallet = async () => {
    await keychain.remove(seedPhraseKey);
    await keychain.remove(privateKeyKey);
    await keychain.remove(addressKey);
}

// export async function loadWallet(mnemonic) {
//     let wallet = ethers.Wallet.fromMnemonic(mnemonic);
//     let user = {};
//     user['mnemonic'] = mnemonic.split(" ");
//     user['address'] = wallet.address.toLowerCase();
//     user['privateKey'] = wallet.privateKey;
//     userModel.allSet(user);
//     await asyncStorageSave(USER_KEY, user);
//     return wallet;
// }

// 载入钱包
export const loadWallet = async () => {
    const privateKey = await loadPrivateKey();   
    if (privateKey) {
      console.log('privateKey-network', privateKey, UserStore.network);
      let network = ALLOW_NETWORK.filter(item => item.code === UserStore.network)[0];
      console.log('loadWallet:',network);
    //   const provider = ethers.getDefaultProvider(network.code.split("-")[1]);
    //   if(network.chain !== 'ETH'){
    //     provider = new ethers.providers.JsonRpcProvider(network.rpc_url);
    //   }
      provider = new ethers.providers.JsonRpcProvider(network.rpc_url);
      wallet = new ethers.Wallet(privateKey, provider);
      return wallet;
    }
    return null;
};

//发送一笔交易
export async function sendTransaction(transaction) {
    console.log('platform:', ethers.platform)
    // const user = await asyncStorageLoad(USER_KEY);
    console.log(transaction);
    // let activeAccount = new ethers.Wallet(user.privateKey);
    let activeAccount = await loadWallet();
    // activeAccount.provider = PROVIDER;
    console.log('activeAccount-transaction', activeAccount.address,transaction);
    if (activeAccount) {
        if (transaction.from && transaction.from.toLowerCase() !== activeAccount.address.toLowerCase()) {
            console.error("Transaction request From doesn't match active account"); // tslint:disable-line
        }

        if (transaction.from) {
            delete transaction.from;
        }
        
        const result = await activeAccount.sendTransaction(transaction);
        console.log('交易被拒绝',result);
        return result.hash;
    } else {
        console.error("No Active Account"); // tslint:disable-line
    }
    return null;
}

//签名消息
export async function signMessage(message) {
    // const user = await asyncStorageLoad(USER_KEY);
    // console.log(user);
    // let activeAccount = new ethers.Wallet(user.privateKey);
    let activeAccount = await loadWallet();
    // activeAccount.provider = PROVIDER;
    if (activeAccount) {
        const result = await activeAccount.signMessage(message);
        return result;
    } else {
        console.error("No Active Account"); // tslint:disable-line
    }
    return null;
}


// export async function sendTransaction(transaction) {

//     const user = await asyncStorageLoad(USER_KEY);
//     console.log(transaction);
//     let activeAccount = new ethers.Wallet(user.privateKey);
//     activeAccount.provider = PROVIDER;
//     console.log('activeAccount', activeAccount.address);
//     if (activeAccount) {
//         if (transaction.from && transaction.from.toLowerCase() !== activeAccount.address.toLowerCase()) {
//             console.error("Transaction request From doesn't match active account"); // tslint:disable-line
//         }

//         if (transaction.from) {
//             delete transaction.from;
//         }
        
//         const result = await activeAccount.sendTransaction(transaction);
//         return result.hash;
//     } else {
//         console.error("No Active Account"); // tslint:disable-line
//     }
//     return null;
// }

// export async function signMessage(message) {
//     const user = await asyncStorageLoad(USER_KEY);
//     console.log(user);
//     let activeAccount = new ethers.Wallet(user.privateKey);
//     activeAccount.provider = PROVIDER;
//     if (activeAccount) {
//         const result = await activeAccount.signMessage(message);
//         return result;
//     } else {
//         console.error("No Active Account"); // tslint:disable-line
//     }
//     return null;
// }


