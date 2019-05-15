import * as keychain from './Keychain';
// import ethers from 'ethers';
// import { RNUportHDSigner } from 'react-native-uport-signer';
import {
    ACCESS_CONTROL,
    ACCESSIBLE,
    AUTHENTICATION_TYPE,
    canImplyAuthentication,
} from 'react-native-keychain';

// import bip39 from 'react-native-bip39';

// import hdKey from 'hdkey'

import HDWallet from './hdwallet/HDWallet';
import walletUtils from './hdwallet/walletUtils';
// var ethUtil = require('ethereumjs-util');

const seedPhraseKey = 'openWalletSeedPhrase';
const privateKeyKey = 'openWalletPrivateKey';
const addressKey = 'openWalletAddressKey';

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

// 生成助记词
export function generateSeedPhrase() {
    return bip39.generateMnemonic(); //ethers.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
}



// createAddress = () => {

   
//     walletUtils.generateMnemonic().then((data) => {
//       const seed = walletUtils.mnemonicToSeed(data)
//       const seedHex = seed.toString('hex')
//       var hdwallet = HDWallet.fromMasterSeed(seed)
//       hdwallet.setDerivePath("m/44'/60'/0'/0/0")
//       const checksumAddress = hdwallet.getChecksumAddressString();
//       this.setState({
//         mnemonic: data,
//         seed: seedHex,
//         path: derivePath,
//         address: checksumAddress
//       })
//     }, (error) => {
//       Alert.alert(
//         'error',
//         'mnemonic' + error.toString
//       )
//     })
// }

// //通过 助记词 创建钱包 
const createWallet = async (seedPhrase) => {
    // console.log('创建钱包start:',seedPhrase);
    const walletSeedPhrase = seedPhrase || generateSeedPhrase();
    // console.log('创建钱包walletSeedPhrase:',walletSeedPhrase);

    const seed = walletUtils.mnemonicToSeed(walletSeedPhrase);
    // const seedHex = seed.toString('hex');
    var hdwallet = HDWallet.fromMasterSeed(seed);
    hdwallet.setDerivePath("m/44'/60'/0'/0/0");
    const address = hdwallet.getChecksumAddressString();
    const privateKey = hdwallet.getPrivateKeyString();



    // //建立种子
    // let hexSeed = await bip39.mnemonicToSeed(walletSeedPhrase);
    
    // var hdkey = hdKey.fromMasterSeed(hexSeed);

    // var addrNode = hdkey.derive("m/44'/60'/0'/0/0");
    // console.log('addrNode => \n', addrNode);  
    // const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
    // const privateKey =  ethUtil.bufferToHex(addrNode._privateKey)
    // // const privateKey =  ethUtil.bufferToHex(addrNode._privateKey)
    // const addr = ethUtil.publicToAddress(pubKey).toString('hex');
    // const address = ethUtil.toChecksumAddress(addr);
    // //保存钱包信息
 
   

    // const addressObj = await RNUportHDSigner.importSeed(walletSeedPhrase, 'simple');
    // console.log('addressObj',addressObj);
    // const addressObj2  = await  RNUportHDSigner.addressForPath(addressObj.address, `m/44'/60'/0'/0/0`, 'Create a new address');
    // console.log('addressObj2',addressObj2);
   
    saveWalletDetails(walletSeedPhrase, privateKey, address);
    return address;
};


// //通过 助记词 创建钱包 
// const createWallet = async (seedPhrase) => {
//     console.log('创建钱包start');
//     const walletSeedPhrase = seedPhrase || generateSeedPhrase();
//     console.log('创建钱包walletSeedPhrase');
//     const wallet = ethers.Wallet.fromMnemonic(walletSeedPhrase);
//     console.log('创建钱包ethers.Wallet.fromMnemonic');
//     //保存钱包信息
//     saveWalletDetails(walletSeedPhrase, wallet.privateKey, wallet.address);
//     console.log('wallet.address',wallet.address);
//     return wallet.address;
// };

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
