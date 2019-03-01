import React, { Fragment } from 'react'
import {
    StyleSheet
} from 'react-native'

import { Navigation } from 'react-native-navigation';
import { goHome } from '../initNavigation'
import { USER_KEY } from '../config'


import { Screen, TextInput, Text, Spinner, Button,Caption,View } from '@shoutem/ui';
import { asyncStorageSave, asyncStorageLoad } from '../helpers/asyncStorage';

// import ethers from 'ethers';
import {hasAddress} from '../helpers/userFetch';
import {loadWallet} from '../helpers/wallet';

import userModel from '../model/userModel';
import { goUserInfo } from '../initNavigation';

import validator from 'validator';
import Toast, {DURATION} from 'react-native-easy-toast';
export default class TraditionalSignIn extends React.Component {
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
                    visible: false
                },
                rightButtons: [
                    {
                        id: 'SignUp',
                        // icon: <Icon name="sidebar" />,
                        text: '创建新用户',
                        color: '#000000',

                    }
                ],
                leftButtons: [],
            }
        };
    }
   
    constructor(props) {
		super(props);
		this.state = {
            mnemonic: '',
            telephone:'',
            password:'',
            isLoading: false
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

    async signIn (){
        // console.log('323232!');
        const {telephone, password} = this.state;
        console.log(telephone);
        if(!validator.isMobilePhone(telephone, ['zh-CN', 'zh-HK', 'zh-TW'])){
            this.refs.toast.show('请输入正确的电话号码')
        }

        if(!validator.isByteLength(password,{min:6, max:6})){
            this.refs.toast.show('请输入6位长度的密码,安全密码')
        }

       
    }

    async saveWallet(mnemonic){
        let wallet = await loadWallet(mnemonic);
        let result = await hasAddress(wallet.address);
        if(result){
            this.setState({
                isLoading: false,
              });
            goHome();
        } else {
            this.setState({
                isLoading: false,
            });
            goUserInfo();
        }
    }

  

 
    static navigatorStyle = {
        topBarElevationShadowEnabled: false
    };

    render() {
        // const { isLoading } = this.state;
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

                        <TextInput
                            style={styles.input}
                            placeholder='安全密码(六位)'
                            // placeholder={'Password'}
                            secureTextEntry
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('password', val)}
                        />
                       
                        <View  style={styles.otherSign} >
                            <Caption 
                                styleName="bold"
                                style={styles.rightSign}
                                onPress={() =>  
                                    Navigation.push(this.props.componentId, {
                                    component: {
                                        name: 'SignIn',
                                    }
                                })} 
                            >
                                助记词登录
                            </Caption> 
                        </View>
                        
                
                        <Button
                            styleName="secondary"
                            style={{
                                width: 300,
                                marginTop: 30,
                            }}
                            // onPressIn={() => this.setState({isLoading:true})}
                            onPress={() => this.signIn()}
                            // title="登陆身份"
                        >
                            <Text>登录身份</Text>
                        </Button>
                    </Screen>}
                <Toast 
                    ref="toast"  
                    position='top'
                    positionValue={150}
                />             
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        // height: 120,
        margin: 5,
        // color: 'white',
        padding: 5,
        paddingLeft: 10,
        backgroundColor: '#F5F5F5',
        // borderRadius: ,
        // borderWidth: 0.5,
        // borderColor: '#5f5f5f',
    },
   
    container: {
        backgroundColor: 'white',
    },
    container2: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: '25%',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    // toast:{
    //     marginTop: '35%',
    // },
    otherSign:{
        width:300,
        flexDirection:'row',
        justifyContent: 'flex-end',
    },
    rightSign:{
        // justifyContent: '',
        marginRight:5,
        alignItems: 'flex-end',
    }
})