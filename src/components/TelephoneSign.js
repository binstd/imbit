import * as React from "react";
import {
    AsyncStorage,
    StyleSheet,
} from 'react-native';

import {
    ScrollView,
    Row,
    Subtitle,
    Text,
    Button,
    View,
    Screen,
    TextInput,
    Caption,
    Divider,
} from '@shoutem/ui';
// import timerModel from '../model/timerModel';
import { asyncStorageSave, asyncStorageLoad } from '../helpers/asyncStorage';
import { hasTelephone } from '../helpers/userFetch';
import { goHome, goUserInfo } from '../initNavigation';
import { USER_KEY,SERVER_URL } from '../config';
import validator from 'validator';
import Toast, { DURATION } from 'react-native-easy-toast';
import timerModel from '../model/timerModel';
import { observer } from 'mobx-react/native';
const TelephoneSign = observer( class TelephoneSign extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            telephone: '',
            code: '',
            realCode:'',
            isLoading: false,
            isSending: false
        };
    }


    componentDidMount() {
       
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }

    async getMassegeCode() {
        const { telephone, code } = this.state;
        if (!validator.isMobilePhone(telephone, ['zh-CN', 'zh-HK', 'zh-TW'])) {
            this.refs.toast.show('请输入正确的电话号码');
        } else {
            // this.setState({ isSending: true });
            fetch(`https://api.binstd.com/api/virify/massegecode?telephone=${telephone}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then( data => {
                
                timerModel.reset();
             
                this.setState({
                    realCode:data.code,
                    isSending:true
                });
            });   
        }
    }

    virifyMassegeCode() {
        const { telephone, code, realCode} = this.state;
        // console.log(telephone);
        if (!validator.isMobilePhone(telephone, ['zh-CN', 'zh-HK', 'zh-TW'])) {
            this.refs.toast.show('请输入正确的电话号码!');
        }

        if (!validator.isByteLength(code, { min: 6, max: 6 })) {
            this.refs.toast.show('请输入您接收到的验证码!');
        }

        if(realCode == code) {  
            // this.setState({ isLoading: true }); 
            this.props.setLoading(true);
            setTimeout(() => {
                this.toPage();
            }, 500);
        } else {
            this.refs.toast.show('您输入的验证码是错误的!');
        }
    }

    async toPage() {
        const { telephone } = this.state;
        let user = await asyncStorageLoad(USER_KEY)?await asyncStorageLoad(USER_KEY):{};
        user.telephone = telephone;
        await asyncStorageSave(USER_KEY, user);
     
        //判断是新用户还是老用户,登录验证
        if(await hasTelephone(telephone) == 1) {
            if(user['address']) {
                this.refs.toast.show('该手机号已被使用，请更换新手机号重试！');
                return;
            } else {
                this.props.setLoading(false);
                goHome();
            }  
        } else {
            this.props.setLoading(false);
            goUserInfo();
        }

    }

    render() {
       
        const { isSending } = this.state;

        let  virifyView;
        if (timerModel.timer > 0 && isSending) {
            virifyView  =  <Caption 
                                styleName="bold"
                                style={{
                                    margin:'auto',
                                    marginRight:25,
                                    color:'#666666',
                                    fontSize: 15,
                                    // backgroundColor: 'white',
                                }}
                            > 剩余
                            <Text style={{color:'#308EFF',marginLeft: 0,}}>{timerModel.timer}</Text>
                            秒
                            </Caption> ;
        } else {
            virifyView  =    <Button
                                styleName="secondary"
                                style={{
                                    width: 120,
                                    // height: 50,
                                    margin: 'auto',
                                    marginRight:10,
                                    backgroundColor: 'white',
                                    borderColor: 'white',
                                }}
                                onPress={() => this.getMassegeCode()}
                            >
                                <Text
                                    style={{ 
                                        color: '#333333',
                                        fontSize: 15,
                                    }}
                                >
                                    获取验证码
                                </Text>
                            </Button>;
        }

        return (
            <Screen style={styles.container2} >
                <TextInput
                    style={styles.input}
                    placeholder='请输入手机号'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('telephone', val)}
                />
                <View style={{
                    height: 2,
                    width: '100%',
                    marginTop: 0,
                    marginBottom: 0,
                    backgroundColor: 'white'
                }}>
                    <Divider
                        styleName="line"
                        style={styles.inputLine}
                    />
                </View>

                <View style={styles.virify} >
                    <TextInput
                        style={styles.code}
                        placeholder='请输入验证码'
                        autoCapitalize="none"
                        placeholderTextColor='white'
                        onChangeText={val => this.onChangeText('code', val)}
                    />
                    {virifyView}
                </View>

                <Button
                    styleName="secondary"
                    style={styles.buttonSign}
                    onPress={() => this.virifyMassegeCode()}
                >
                    <Text style={styles.buttonText} >登录</Text>
                </Button>
                <View style={styles.otherSign} >
                    <Caption
                        styleName="bold"
                        style={styles.footerSign}
                    >
                        首次登录会自动创建新账户
                    </Caption>
                </View>
                <Toast
                    ref="toast"
                    position='top'
                    positionValue={150}
                />
            </Screen>
        );
    }
});

export default TelephoneSign;

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center'
    },
    inputLine:{
        width: '90%',
        height: 1,
        backgroundColor: '#EEEEEE',
        margin: 'auto',
    },
    input: {
        width: '100%',
 
        backgroundColor: 'white',
    },
    virify: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    otherSign: {
        width: 300,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    code: {
        width: 180,
        backgroundColor: 'white',
    },
    rightSign: {
        marginRight: 5,
        alignItems: 'flex-end',
    },
    footerSign: {
        margin: 'auto',
        marginTop: 10,
        alignItems: 'center',
        color: '#999999'
    },
    buttonSign: {
        width: '90%',
        marginTop: 55,
        backgroundColor: '#308EFF',
        borderColor: '#308EFF'
    },
    buttonText: {
        fontSize: 18
    }

});


