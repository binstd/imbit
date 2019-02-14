import 'ethers/dist/shims.js';
import { ethers } from 'ethers';
import { USER_KEY, SERVER_URL } from '../config'
import userModel from '../model/userModel';
import {asyncStorageSave,asyncStorageLoad} from '../helpers/asyncStorage';

import { goMnomonic } from '../initNavigation'

// 创建钱包，持久化保存钱包地址和私钥

// export function createWalletKey() {
//     const wallet = Wallet.createRandom();
//     AsyncStorage.setItem(WALLET_NAME+'_ADDRESS', JSON.stringify(wallet.address));
//     AsyncStorage.setItem(WALLET_NAME+'_PRIVATEKEY', JSON.stringify(wallet.privateKey));
// }

// 生成密钥保存个人信息
export async function CreateUser({ username, email, telephone}) {
    //publicAddress 
    if(!userModel.mnemonic) {
        let wallet = ethers.Wallet.createRandom();
        mnemonic = wallet.mnemonic;
        // console.log('setting mnemonic',mnemonic.split(" "));
        userModel.mnemonicSet(mnemonic.split(" "));
        userModel.addressSet(wallet.address);
        let user = {};
      
        user['publicAddress'] = wallet.address.toLowerCase(); 
        user['username'] = username;
        user['email'] = email;
        user['telephone'] = telephone;
        // console.log("user:\n",user);
        // const postData = user;
        // user
        fetch(`${SERVER_URL}api/users`, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => response.json()).then( data => {
            user['mnemonic'] = mnemonic.split(" ")
            user['address']  = wallet.address.toLowerCase()
            user['uid'] = data.id
            asyncStorageSave(USER_KEY, user);
            goMnomonic();  
        });

       
    } 

}