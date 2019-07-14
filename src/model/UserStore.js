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
    @observable hasPrivate = false;
    @observable network = 'eth-mainnet';

    constructor() {
        AsyncStorage.getItem('userinfo').then( (data) => {
            if(data) {
                this.allSet(JSON.parse(data));
            }
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
            network:this.network,
            openTouchId:this.openTouchId,
            hasPrivate:this.hasPrivate
        };
        return data;
    }
    //获取结果
    @computed
    get isLogin() {
        return this.isAuth ? true : false;
    }

    //操作
    @action.bound
    async login( userInfo ) {
        console.log(" async login( userInfo ) { => ",userInfo);
        await this.allSet(userInfo);
        this.isAuth = true;
        console.log('断在这里');
        await AsyncStorage.setItem('userinfo', JSON.stringify(this.getAllData));
    }

    @action.bound
    async allSet( jsonData ) {
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

        if(jsonData['network']) {
            this.network = jsonData['network'];
        }
        if(jsonData['hasPrivate']) {
            this.hasPrivate = jsonData['hasPrivate'];
        }
        console.log('插入了');
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
        this.network = 'eth-mainnet';
        this.openTouchId = false;
        this.hasPrivate = false;
        AsyncStorage.removeItem('userinfo');
    }
}

export default new UserStore();
