import { decorate, observable, action, computed } from "mobx";

class factorModel {
    id = Math.random();
    factors = [];
    
  
    //获取所以token值的方法
    get getFactorData() {
        let factors = [];
        factors = this.factors
        return factors;
    }

    // token设定
    factorSet(factors) {
        this.factors = factors;
    }
    
    //添加币种
    factorPush(factor) {
        this.factors.push(factor);
    }
}

decorate(factorModel, {
    factors: observable,
    factorPush: action,
    getFactorData: computed,
});

export default new factorModel();