import { observable, action, computed } from "mobx";

// import { AsyncStorage } from 'react-native';

class tokenStore {
    
    // constructor() {
    //     AsyncStorage.getItem('tokens').then( (data) => {
    //         this.tokens =  data ? observable.array(JSON.parse(data)) : observable.array();
    //     });
    // }
 
    @observable balance = '';
    @observable tokens;

    // 获取所以token值的方法
    @computed 
    get gettokenData() {
        let tokens = [];
        tokens = this.tokens;
        return tokens;
    }

    // token设定
    @action
    tokenSet(tokens) {
        this.tokens = tokens;
        return 1;
    }
    
    @action
    balanceSet(balance) {
        console.log('balance:',balance);
        this.balance = balance;
        return 1;
    }
    // //添加币种
    // @action
    // tokenPush( token ) {
    //     const length = this.tokens.length;
    //     this.tokens[length] = token;
    //     // AsyncStorage.setItem('tokens', JSON.stringify(this.tokens));
    // }

    // @action
    // tokenRemove( token ) {
    //     let tokens = this.tokens.filter(item => item.startCode !== token.startCode);
    //     console.log('==>',  tokens);
    //     this.tokens.replace(tokens);
    // }
}


export default new tokenStore();