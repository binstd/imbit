import {observable, action, computed} from 'mobx';
// import { decorate, observable, action, computed } from "mobx";
import { AsyncStorage } from 'react-native'

class UserStore {

    @observable userInfo = {};
    @observable isAuth = false;

    constructor() {
        AsyncStorage.getItem('userinfo').then( (data) => {
            // this.factors =  data ? observable.array(JSON.parse(data)) : observable.array();
            this.userInfo = data ? JSON.parse(data) : null;
        });
    }
   
    //获取结果
    @computed 
    get isLogin() {
        console.log('this.isAuth',this.isAuth);
        return this.isAuth ? true : false;
    }

    //操作
    @action.bound
    login( userInfo ) {
        this.userInfo = userInfo;
        this.isAuth = true;
        AsyncStorage.setItem('userinfo', JSON.stringify(userInfo) );
    }
    
    @action.bound
    allSet( jsonData ) {

        if (jsonData['uid']) {
            this.userInfo['uid'] = jsonData['uid'];
        }

        if (jsonData['username']) {
            this.userInfo['username'] = jsonData['username'];
        }

        if (jsonData['telephone']) {
            this.userInfo['telephone'] = jsonData['telephone'];
        }

        if (jsonData['address']) {
            this.userInfo['address'] = jsonData['address'];
        }

        if (jsonData['privateKey']) {
            this.userInfo['privateKey'] = jsonData['privateKey'];
        }

        if(jsonData['mnemonic']) {
            this.userInfo['mnemonic'] = jsonData['mnemonic'];
        }

        if(jsonData['email']) {
            this.userInfo['email'] = jsonData['email'];
        }

        if(jsonData['token']) {
            this.userInfo['token'] = jsonData['token'];
        }
        
        if(jsonData['openTouchId']) {
             this.userInfo['openTouchId'] = jsonData['openTouchId'];
        }

        if(Object.keys(jsonData).length !== 0 ) {
            this.isAuth = true;
            AsyncStorage.setItem('userinfo', JSON.stringify(this.userInfo));
        }
    }

    //操作
    @action.bound
    logout() {
        this.userInfo = {};
        this.isAuth = false;
        AsyncStorage.removeItem('userinfo');
    }
}

export default new UserStore();
