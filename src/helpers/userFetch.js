// import 'ethers/dist/shims.js';
import ethers  from 'ethers';
import { USER_KEY, SERVER_URL } from '../config'
import userModel from '../model/userModel';
import { asyncStorageSave, asyncStorageLoad } from '../helpers/asyncStorage';

import { goMnomonic } from '../initNavigation'

// 生成密钥保存个人信息
export async function CreateUser({ username, email, telephone}) {
    //publicAddress 
    if(!userModel.mnemonic) {
        let wallet = ethers.Wallet.createRandom();
        mnemonic = wallet.mnemonic;

        let user = {};
        user['publicAddress'] = wallet.address.toLowerCase(); 
        user['username'] = username;
        user['email'] = email;
        user['telephone'] = telephone;

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

//
export async function RegisterUserInfo({ username, email, telephone}) {
    const user = await asyncStorageLoad(USER_KEY);
    let postData = {};
    postData['publicAddress'] = user['address']; 
    postData['username'] = username;
    postData['email'] = email;
    postData['telephone'] = telephone;
    console.log(postData);
    let data = await fetch(`${SERVER_URL}api/users`, {
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(response => response.json());

    if(data.code != 1200) {
        user['username'] = username;
        user['email'] = email;
        user['telephone'] = telephone;
        user['uid'] = data.id;
        await asyncStorageSave(USER_KEY, user);
        userModel.allSet(user);
        // goMnomonic();  
    }
}

//0xded8f0646c28678510f6cc98a948e5927cb616af 案例
export async function hasAddress(address) {
    // https://api.binstd.com/api/users
    let user = {};
    user['publicAddress'] = address.toLowerCase(); 
    let data = await fetch(`${SERVER_URL}api/users?publicAddress=${user['publicAddress']}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(response => response.json());

    if(data.length != 0) {
        user['uid'] = data[0].id;
        user['address']  = data[0].publicAddress;
        user['username'] = data[0].username;
        user['telephone'] =  data[0].telephone;
        user['email']  = data[0].email;
        await asyncStorageSave(USER_KEY, user);
        return 1;
    } else {
        return 0;
    }
}