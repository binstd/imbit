import UserStore from '../model/UserStore';
//验证指纹识别
export async function authTouchID(authTypeMassage, offAuth = false ) {

    const optionalConfigObject = {
        title: '授权操作:',
        imageColor: '#e00606', 
        imageErrorColor: '#ff0000', 
        sensorDescription: '请进行指纹识别', 
        sensorErrorDescription: 'Failed', 
        cancelText: '取消',
        fallbackLabel: 'Show Passcode', 
        unifiedErrors: false, 
        passcodeFallback: false, 
    };
    let switchOn = UserStore.openTouchId;
    if( switchOn || offAuth ) {
        let authenticate = await TouchID.authenticate(authTypeMassage, optionalConfigObject);
        if( authenticate ) {
            return true;
            console.log('通过, 指纹识别');
        } else {
            console.log('未通过,指纹识别');
            return false;
       
        }
    }else {
        console.log('true');
        return true;
    }
}