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
            let params = {};
            params['identity_id'] = String(walletAddress).toLowerCase();
            params['username'] = username;
            params['email'] = email;
            params['telephone'] = telephone;
            params['password'] = 'zhouzhou';
            console.log('\n  ==> ',params);
            let data = await fetch(`${SERVER_URL}/api/users`, {
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then(response => response.json());
            console.log('POST',data);
            if(data.id) {
                let user = params;
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
    postData['identity_id'] = user['address'];
    postData['username'] = username;
    postData['email'] = email;
    postData['telephone'] = telephone;
    postData['password'] = 'zhouzhou';
    let data = await fetch(`${SERVER_URL}/api/users`, {
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(response => response.json());

    if(data.id) {
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
    console.log('postData[address]', postData['address']);
    console.log(`${SERVER_URL}/api/users?identity_id=${postData['address']} ====>\n `,data);
    let data = await fetch(`${SERVER_URL}/api/users?identity_id=${postData['address']}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(response => response.json());

    if(data.length != 0) {
        let user = {};
        user['uid'] = data[0].id;
        user['address']  = data[0].identity_id;
        user['username'] = data[0].username;
        user['telephone'] =  data[0].telephone;
        user['email']  = data[0].email;
        console.log(user);
        return user;
    } else {
        console.log('新助记词!');
        return null;
    }
}

export async function hasTelephone(telephone) {

    const address = UserStore.address;
    let postData = {};
    postData['telephone'] = telephone;

    console.log(`${SERVER_URL}/api/users?telephone=${postData['telephone']}`);
    console.log('address',address);
    let data = await fetch(`${SERVER_URL}/api/users?telephone=${postData['telephone']}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'
    }).then(response => response.json());

    if(data.length != 0) {
        if (!address) {
            let user = {};
            user['uid'] = data[0].id;
            user['address']  = data[0].identity_id;
            user['username'] = data[0].username;
            user['telephone'] =  data[0].telephone;
            user['email']  = data[0].email;
            console.log(user);
            await UserStore.login(user);
        }
        console.log(' return 1;');
        return 1;
    } else {
        console.log(' return 0;');
        return 0;
    }
}