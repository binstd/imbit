// import 'ethers/dist/shims.js';
import ethers  from 'ethers';
import { USER_KEY, SERVER_URL } from '../config'
import userModel from '../model/userModel';
import {asyncStorageSave,asyncStorageLoad} from '../helpers/asyncStorage';

import { goMnomonic } from '../initNavigation'

// 生成密钥保存个人信息
export async function CreateUser({ username, email, telephone}) {
    //publicAddress 
    if(!userModel.mnemonic) {
      //  console.log(username, email, telephone);
        let wallet = ethers.Wallet.createRandom();
        mnemonic = wallet.mnemonic;

        let user = {};
        user['publicAddress'] = wallet.address.toLowerCase(); 
        user['username'] = username;
        user['email'] = email;
        user['telephone'] = telephone;

        console.log('\n ======', user);
        let data = await fetch(`${SERVER_URL}api/users`, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => response.json());

        if(data.code != 1200) {
            userModel.mnemonicSet(mnemonic.split(" "));
            userModel.addressSet(wallet.address.toLowerCase());
            user['mnemonic'] = mnemonic.split(" ")
            user['address']  = wallet.address.toLowerCase()
            user['uid'] = data.id
            await asyncStorageSave(USER_KEY, user);
            goMnomonic();  
        }
    } 

}