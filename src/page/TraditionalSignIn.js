import React, { Fragment } from 'react'
import {
    StyleSheet
} from 'react-native'

import { Navigation } from 'react-native-navigation';

import { Screen, TextInput, Text, Spinner, Button, Caption, View } from '@shoutem/ui';
import { asyncStorageSave, asyncStorageLoad } from '../helpers/asyncStorage';

import { hasTelephone } from '../helpers/userFetch';

import { goHome, goUserInfo } from '../initNavigation';

import { USER_KEY,SERVER_URL } from '../config';
import validator from 'validator';
import Toast, { DURATION } from 'react-native-easy-toast';

import timerModel from '../model/timerModel';
import { observer } from 'mobx-react/native';
export default TraditionalSignIn = observer( class TraditionalSignIn extends React.Component {
    static get options() {
        return {
            topBar: {
                title: {
                    text: ''
                },
                navBarNoBorder: true,
                hideShadow: true,
                noBorder: true,
                backButton: {
                    visible: true
                },
              
                leftButtons: [],
            }
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            telephone: '',
            code: '',
            realCode:'',
            reTime:59,
            isLoading: false,
            isSending: false
        };
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }

    navigationButtonPressed({ buttonId }) {
        // console.log('buttonId => ', buttonId);
        if (buttonId === 'SignUp') {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'SignUp',
                }
            });
        }
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }

    async getMassegeCode() {
        // console.log('拒绝呀!');
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
                console.log(data);
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
            this.setState({ isLoading: true }); 
            setTimeout(() => {
                this.toPage();
            }, 500);
            // await this.toPage();
        } else {
            this.refs.toast.show('您输入的验证码是错误的!');
        }
    }

    async toPage() {
        const { telephone } = this.state;
        let user = await asyncStorageLoad(USER_KEY)?await asyncStorageLoad(USER_KEY):{};
  
        await asyncStorageSave(USER_KEY, user);
     
        //判断是新用户还是老用户,登录验证
        if(await hasTelephone(telephone) == 1) {
            if(user['address']) {
                this.refs.toast.show('该手机号已被使用，请更换新手机号重试！');
                return;
            } else {
                this.setState({
                    isLoading: false,
                });
                goHome();
            }  
        } else {
            this.setState({
                isLoading: false,
            });
            goUserInfo();
        }

    }

    render() {
        const { isLoading,isSending } = this.state;
        let  virifyView;
        if (timerModel.timer > 0 && isSending) {
            virifyView  =  <Caption 
                            styleName="bold"
                            style={{
                                margin:'auto',
                                marginRight:25
                            }}
                            >
                                倒计时{timerModel.timer}秒
                            </Caption> ;
        } else {
            virifyView  =    <Button
                                styleName="secondary"
                                style={{
                                    width: 100,
                                    height: 40,
                                    margin: 'auto',
                                }}
                                onPress={() => this.getMassegeCode()}
                            >
                                <Text>验证码</Text>
                            </Button>;
        }

        return (
            <Screen style={styles.container}>
                {this.state.isLoading ?
                    <Screen style={styles.container2} >
                        <Spinner />
                    </Screen>
                    :
                    <Screen style={styles.container2} >

                        <TextInput
                            style={styles.input}
                            placeholder='手机号'
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('telephone', val)}
                        />
                        <View style={styles.virify} >
                            
                            <TextInput
                                style={styles.code}
                                placeholder='验证码'
                                // placeholder={'code'}
                                // secureTextEntry
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
                        <View  style={styles.otherSign} >
                            <Caption 
                                styleName="bold"
                                style={styles.footerSign}
                                
                                >
                                首次登陆会自动创建新账户
                            </Caption> 
                        </View>   
                    </Screen>}
                <Toast
                    ref="toast"
                    position='top'
                    positionValue={150}
                />
            </Screen>
        )
    }
});

const styles = StyleSheet.create({
    input: {
        width: 300,
        margin: 5,
        padding: 5,
        paddingLeft: 10,
        backgroundColor: '#F5F5F5',
    },

    container: {
        backgroundColor: 'white',
    },
    container2: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: '25%',
        alignItems: 'center'
    },
    virify: {
        width: 300,
        flexDirection: 'row',
    },
    otherSign: {
        width: 300,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    code: {
        width: 180,
        margin: 5,
        marginLeft: 0,
        padding: 5,
        paddingLeft: 10,
        backgroundColor: '#F5F5F5',
    },
    rightSign: {
        // justifyContent: '',
        marginRight: 5,
        alignItems: 'flex-end',
    },
    footerSign:{
        margin:'auto',
        marginTop:5,
        alignItems: 'center',
    },
    buttonSign:{
        width: 300,
        marginTop: 30,
        backgroundColor:'#308EFF',
        borderColor:'#308EFF'
    },
    buttonText:{
        fontSize:18
    }
})