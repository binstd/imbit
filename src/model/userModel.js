import { decorate, observable, action, computed } from "mobx";

class userModel {
    id = Math.random();
    uid;
    username;
    telephone;
    address;
    privatekey;
    mnemonic;
    pagenum;
    
    get getAllData() {
        const data = {
            uid: this.uid,
            username: this.username,
            telephone: this.telephone,
            address: this.address,
            privatekey: this.privatekey,
            pagenum:this.pagenum,
            mnemonic:this.mnemonic,
        };
        return data;
    }

    allSet(jsonData) {
       
        if (jsonData['uid']) {
            this.uid = jsonData['uid'];
        }

        if (jsonData['username']) {
            console.log(jsonData['username']);
            this.username = jsonData['username'];
        }

        if (jsonData['telephone']) {
            this.telephone = jsonData['telephone'];
        }

        if (jsonData['address']) {
            this.address = jsonData['address'];
        }

        if (jsonData['privatekey']) {
            this.privatekey = jsonData['privatekey'];
        }

        if(jsonData['mnemonic']){
            console.log(jsonData['mnemonic']);
            this.mnemonic = jsonData['mnemonic'];
        }
    }

    uidSet(uid) {
        this.uid = uid;
    }

    usernameSet(username) {
        this.username = username;
    }

    telephoneSet(telephone) {
        this.telephone = telephone;
    }

    addressSet(address) {
        this.address = address;
    }
    privatekeySet(privatekey) {
        this.privatekey = privatekey;
    }

    pagenumSet(pagenum) {
        // console.log("还能无效嘛?:",pagenum);
        this.pagenum = pagenum;
    }

    mnemonicSet(mnemonic) {
        // console.log("mnemonicSet:",mnemonic);
       this.mnemonic = mnemonic;     
    }   
    
    clearAll() {
        this.uid = '';
        this.username = '';
        this.telephone = '';
        this.address = '';
        this.privatekey = '';
        this.mnemonic = '';
    }
}

decorate(userModel, {
    uid: observable,
    username: observable,
    telephone: observable,
    address: observable,
    privatekey: observable,
    pagenum:observable,
    allSet: action,
    uidSet: action,
    usernameSet: action,
    telephoneSet: action,
    addressSet: action,
    privatekeySet: action,
    pagenumSet:action,
    mnemonicSet:action,
    clearAll:action,
    getAllData: computed

});

export default new userModel();