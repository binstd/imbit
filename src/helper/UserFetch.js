// import 'ethers/dist/shims.js';
// import ethers  from 'ethers';
import * as ethers from "ethers";
import { SERVER_URL } from './Config'
import UserStore from '../model/UserStore';
import {walletInit,loadPrivateKey} from './Wallet'


// 生成密钥保存个人信息
export async function CreateUser({ username, email, telephone}) {
    // console.log('username, email, telephone => \n',username, email, telephone);
    if(! UserStore.address) {
        // console.log('loadPrivateKey');
        let { walletAddress } = await walletInit(); //ethers.Wallet.createRandom();
        if( walletAddress ) {
            let user = {};
            user['publicAddress'] = String(walletAddress).toLowerCase();  
            user['username'] = username;
            user['email'] = email;
            user['telephone'] = telephone;
            console.log('\n String(walletAddress).toLowerCase() ==> ',typeof  String(walletAddress).toLowerCase());
            let data = await fetch(`${SERVER_URL}api/users`, {
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then(response => response.json());

            if(data.code != 1200) {
                user['address']  = walletAddress;
                user['hasPrivate'] = true;
                user['uid'] = data.id
                await UserStore.login(user);
            
                return 1;
            } else {
                return 0;
            }
        }
        
    } 
}

// 
export async function RegisterInfo({ username, email, telephone}) {
    let user = UserStore.getAllData; // await asyncStorageLoad(USER_KEY) || {};
    let postData = {};
    postData['address'] = user['address']; 
    postData['username'] = username;
    postData['email'] = email;
    postData['telephone'] = telephone;
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
        await UserStore.login(user);
        return 1;
    } else {
        return 0;
    }
}

// 案例
export async function hasAddress(address) {
    let postData = {};
    postData['address'] = address.toLowerCase(); 
    let data = await fetch(`${SERVER_URL}api/users?publicAddress=${postData['address']}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(response => response.json());

    if(data.length != 0) {
        let user = {};
        user['uid'] = data[0].id;
        user['address']  = data[0].publicAddress;
        user['username'] = data[0].username;
        user['telephone'] =  data[0].telephone;
        user['email']  = data[0].email;
        console.log(user);
        return user;
    } else {
        return null;
    }
}

export async function hasTelephone(telephone) {

    const address = UserStore.address;
    let postData = {};
    postData['telephone'] = telephone; 
    let data = await fetch(`${SERVER_URL}api/users?telephone=${postData['telephone']}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(response => response.json());
    console.log('api/users?telephone?', data);
    if(data.length != 0) {
        if (!address) {
            let user = {};
            user['uid'] = data[0].id;
            user['address']  = data[0].publicAddress;
            user['username'] = data[0].username;
            user['telephone'] =  data[0].telephone;
            user['email']  = data[0].email;
            await UserStore.login(user);
        }
        console.log(' return 1;');
        return 1;
    } else {
        console.log(' return 0;');
        return 0;
    }
}