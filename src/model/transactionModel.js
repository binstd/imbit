import { decorate, observable, action, computed } from "mobx";

class transactionModel {
    id = Math.random();
    tokenInfo;
    address;
    
    get getAllData() {
        const data = {
            tokenInfo: this.tokenInfo,
        };
        return data;
    }

    allSet(jsonData) {
        if (jsonData['tokenInfo']) {
            this.tokenInfo = jsonData['tokenInfo'];
        }
    }
    
    tokenInfoSet(tokenInfo) {
        this.tokenInfo = tokenInfo ;
    }

    uidSet(uid) {
        this.uid = uid;
    }

    clearAll() {
        this.tokenInfo = {};
    }
}

decorate(transactionModel, {
    uid: observable,
    tokenInfo: observable,
    allSet: action,
    clearAll:action
});

export default new transactionModel();