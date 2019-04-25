import {observable, action, computed} from 'mobx';
// import { decorate, observable, action, computed } from "mobx";
import { AsyncStorage } from 'react-native'

class UserStore {

    @observable userInfo = {};
    @observable uid = null;
    @observable username = '';
    @observable telephone = '';
    @observable address = '';
    @observable email = '';
    @observable openTouchId = false;
    @observable isAuth = false;

    constructor() {
        AsyncStorage.getItem('userinfo').then( (data) => {
            // this.userInfo = data ? JSON.parse(data) : null;
            console.log(' constructor 1');
            if(data) {
                this.allSet(JSON.parse(data));
                console.log(' constructor 2');
            }
            console.log(' constructor 3');
        });
    }
     
    @computed 
    get getAllData() {
        const data = {
            uid: this.uid,
            username: this.username,
            telephone: this.telephone,
            address: this.address,
            email:this.email,
            isAuth:this.isAuth,
            // token:this.token,
            openTouchId:this.openTouchId
        };
        return data;
    }


    //获取结果
    @computed 
    get isLogin() {
        console.log('this.isAuth',this.isAuth);
        return this.isAuth ? true : false;
    }

    //操作
    @action.bound
    async login( userInfo ) {
        console.log('login data:', userInfo);
        this.allSet(userInfo);
        this.isAuth = true;
        await AsyncStorage.setItem('userinfo', JSON.stringify(userInfo) );
    }
  
    @action.bound
    allSet( jsonData ) {
        if (jsonData['uid']) {
            this.uid = jsonData['uid'];
        }

        if (jsonData['username']) {
            this.username = jsonData['username'];
        }

        if (jsonData['telephone']) {
           this.telephone = jsonData['telephone'];
        }

        if (jsonData['address']) {
            this.address = jsonData['address'];
        }

        if(jsonData['email']) {
            this.email = jsonData['email'];
        }
        
        if(jsonData['openTouchId']) {
             this.openTouchId = jsonData['openTouchId'];
        }

    }

    //操作
    @action.bound
    logout() {
        this.userInfo = {};
        this.uid = null;
        this.username = '';
        this.telephone = '';
        this.address = '';
        this.email = '';
        this.isAuth = false;
        AsyncStorage.removeItem('userinfo');
    }
}

export default new UserStore();
