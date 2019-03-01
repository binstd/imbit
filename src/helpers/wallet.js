import ethers from 'ethers';
import { asyncStorageSave, asyncStorageLoad } from './asyncStorage';
import userModel from '../model/userModel';
import { USER_KEY } from '../config'
//0xded8f0646c28678510f6cc98a948e5927cb616af 案例
export async function loadWallet(mnemonic) {
    let wallet = ethers.Wallet.fromMnemonic(mnemonic);
    let user = {};
    
    user['mnemonic'] = mnemonic.split(" ");
    user['address'] = wallet.address.toLowerCase();
    userModel.allSet(user);
    await asyncStorageSave(USER_KEY, user);
    return wallet; 
}