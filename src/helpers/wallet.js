import ethers from 'ethers';
import { asyncStorageSave, asyncStorageLoad } from './asyncStorage';
import userModel from '../model/userModel';
import { USER_KEY } from '../config'
//0xded8f0646c28678510f6cc98a948e5927cb616af 案例

const { HDNode, providers, utils, Wallet } = ethers;
const network = (process.env.NODE_ENV === 'production') ? 'mainnet' : 'rinkeby';

const PROVIDER = providers.getDefaultProvider('ropsten');


export async function loadWallet(mnemonic) {
    let wallet = ethers.Wallet.fromMnemonic(mnemonic);
    let user = {};

    user['mnemonic'] = mnemonic.split(" ");
    user['address'] = wallet.address.toLowerCase();
    user['privateKey'] = wallet.privateKey;
    userModel.allSet(user);
    await asyncStorageSave(USER_KEY, user);
    return wallet;
}


export async function sendTransaction(transaction) {

    const user = await asyncStorageLoad(USER_KEY);
    console.log(transaction);
    let activeAccount = new ethers.Wallet(user.privateKey);
    activeAccount.provider = PROVIDER;
    console.log('activeAccount', activeAccount.address);
    if (activeAccount) {
        if (transaction.from && transaction.from !== activeAccount.address) {
            console.error("Transaction request From doesn't match active account"); // tslint:disable-line
        }

        if (transaction.from) {
            delete transaction.from;
        }

        const result = await activeAccount.sendTransaction(transaction);
        return result.hash;
    } else {
        console.error("No Active Account"); // tslint:disable-line
    }
    return null;
}

export async function signMessage(message) {
    const user = await asyncStorageLoad(USER_KEY);
    let activeAccount = new ethers.Wallet(user.privateKey);
    activeAccount.provider = PROVIDER;
    if (activeAccount) {
        const result = await activeAccount.signMessage(message);
        return result;
    } else {
        console.error("No Active Account"); // tslint:disable-line
    }
    return null;
}

