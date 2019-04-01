import { decorate, observable, action, computed } from "mobx";

class userModel {
    id = Math.random();
    uid;
    email;
    username;
    telephone;
    address;
    privateKey;
    mnemonic;
    pagenum;
    token;
    openTouchId = false;

    get getAllData() {
        const data = {
            uid: this.uid,
            username: this.username,
            telephone: this.telephone,
            address: this.address,
            privateKey: this.privateKey,
            pagenum:this.pagenum,
            mnemonic:this.mnemonic,
            email:this.email,
            token:this.token,
            openTouchId:this.openTouchId
        };
        return data;
    }

    allSet(jsonData) {
       
        if (jsonData['uid']) {
            this.uid = jsonData['uid'];
        }

        if (jsonData['username']) {
            // console.log(jsonData['username']);
            this.username = jsonData['username'];
        }

        if (jsonData['telephone']) {
            this.telephone = jsonData['telephone'];
        }

        if (jsonData['address']) {
            this.address = jsonData['address'];
        }

        if (jsonData['privateKey']) {
            this.privateKey = jsonData['privateKey'];
        }

        if(jsonData['mnemonic']){
            // console.log(jsonData['mnemonic']);
            this.mnemonic = jsonData['mnemonic'];
        }

        if(jsonData['email']){
            // console.log(jsonData['email']);
            this.email = jsonData['email'];
        }
        if(jsonData['token']) {
            // console.log(jsonData['token']);
            this.token = jsonData['token'];
        }
        
        if(jsonData['openTouchId']) {
            // console.log(jsonData['openTouchId']);
            this.openTouchId = jsonData['openTouchId'];
        }
    }

    openTouchIdSet(openTouchId) {
        this.openTouchId = openTouchId;
    }

    uidSet(uid) {
        this.uid = uid;
    }

    tokenSet(token) {
        this.token = token;
    }

    usernameSet(username) {
        this.username = username;
    }

    emailSet(email) {
        this.email = email;
    }

    telephoneSet(telephone) {
        this.telephone = telephone;
    }

    addressSet(address) {
        this.address = address;
    }
    
    privateKeySet(privateKey) {
        this.privateKey = privateKey;
    }

    pagenumSet(pagenum) {
        this.pagenum = pagenum;
    }

    mnemonicSet(mnemonic) {
       this.mnemonic = mnemonic;     
    }   
    
    clearAll() {
        this.uid = '';
        this.username = '';
        this.telephone = '';
        this.address = '';
        this.privateKey = '';
        this.mnemonic = '';
        this.pagenum = '';
        this.email = '';
        this.token = '';
    }
}

decorate(userModel, {
    uid: observable,
    username: observable,
    telephone: observable,
    address: observable,
    privateKey: observable,
    pagenum:observable,
    allSet: action,
    uidSet: action,
    usernameSet: action,
    telephoneSet: action,
    addressSet: action,
    privateKeySet: action,
    pagenumSet:action,
    mnemonicSet:action,
    clearAll:action,
    getAllData: computed

});

export default new userModel();