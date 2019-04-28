import { decorate, observable, action, computed } from "mobx";

class transactionModel {
    id = Math.random();
    tokenInfo;
    toaddress;
    
    get getAllData() {
        const data = {
            tokenInfo: this.tokenInfo,
            toaddress:this.toaddress
        };
        return data;
    }

    allSet(jsonData) {
        if (jsonData['tokenInfo']) {
            this.tokenInfo = jsonData['tokenInfo'];
        }
    }   

    toaddressSet(toaddress) {
        this.toaddress = toaddress ;
    }
    
    tokenInfoSet(tokenInfo) {
        this.tokenInfo = tokenInfo ;
    }

    uidSet(uid) {
        this.uid = uid;
    }

    clearAll() {
        this.tokenInfo = {};
        this.toaddress = '';
    }
}

decorate(transactionModel, {
    uid: observable,
    tokenInfo: observable,
    toaddress: observable,
    toaddressSet:action,
    allSet: action,
    clearAll:action
});

export default new transactionModel();