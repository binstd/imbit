import { observable, action, computed } from "mobx";
import { AsyncStorage } from 'react-native'

class factorStore {
    
    constructor() {
        AsyncStorage.getItem('factors').then( (data) => {
            this.factors =  data ? observable.array(JSON.parse(data)) : observable.array();
        });
    }

    @observable factors = observable.array();

    // 获取所以token值的方法
    @computed 
    get getFactorData() {
        let factors = [];
        factors = this.factors;
        return factors;
    }

    // token设定
    @action
    factorSet(factors) {
        this.factors = factors;
        AsyncStorage.setItem('factors', JSON.stringify(this.factors));
    }
    
    //添加币种
    @action
    factorPush( factor ) {
        const length = this.factors.length;
        this.factors[length] = factor;
        AsyncStorage.setItem('factors', JSON.stringify(this.factors));
    }
}


export default new factorStore();