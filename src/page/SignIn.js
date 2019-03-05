import React, { Fragment } from 'react'
import {
    StyleSheet
} from 'react-native'

import { Navigation } from 'react-native-navigation';
import { goHome } from '../initNavigation'
import { USER_KEY } from '../config'


import { Screen, TextInput, Text, Spinner, Button,Caption,View } from '@shoutem/ui';
import { asyncStorageSave, asyncStorageLoad } from '../helpers/asyncStorage';


import {hasAddress} from '../helpers/userFetch';
import {loadWallet} from '../helpers/wallet';

import userModel from '../model/userModel';
import { goUserInfo } from '../initNavigation';

import validator from 'validator';
import Toast, {DURATION} from 'react-native-easy-toast';
export default class SignIn extends React.Component {
    static get options() {
        return {
            topBar: {
                title: {
                    text: ''
                },
                backButton: {
                    visible: false
                },
                background: {
                    translucent: true
                }, 
                navBarNoBorder: true,
                hideShadow: true,
                noBorder: true,
                // rightButtons: [
                //     {
                //         id: 'SignUp',
                //         // icon: <Icon name="sidebar" />,
                //         text: '创建新用户',
                //         color: '#000000',

                //     }
                // ],
                leftButtons: [],
            }
        };
    }
   
    constructor(props) {
		super(props);
		this.state = {
            mnemonic: '',
            isLoading: false
        };
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }
    
    navigationButtonPressed({ buttonId }) {
        console.log('buttonId => ', buttonId);
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
        let { mnemonic } = this.state;
        let mnemonicList = mnemonic.split(" ");
        console.log(mnemonicList.length);
        if(mnemonicList.length!=12 ){
            this.refs.toast.show('助记词仅支持用空格隔开的12个单词！');
            return;
        }else {
            this.setState({ isLoading: true });
            setTimeout(() => {
                this.saveWallet(mnemonic);
             }, 500);
        }
    }

    async saveWallet(mnemonic){
        let wallet = await loadWallet(mnemonic);
        if(!wallet){
            this.setState({
                isLoading: false,
            });
            this.refs.toast.show('无法创建区块链身份,请检测助记词是否正确！');
        }
        let result = await hasAddress(wallet.address);
        if(result == 1){
            this.setState({
                isLoading: false,
              });
            goHome();
        } else {
            this.setState({
                isLoading: false,
            });
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'TraditionalSignIn',
                }
            })
            
        }
    }

  

 
    static navigatorStyle = {
        topBarElevationShadowEnabled: false
    };

    render() {
        // const { isLoading } = this.state;
        return (
            <Screen style={styles.container}  >
                {this.state.isLoading ?
                    <Screen style={styles.container2} >
                         <Spinner /> 
                    </Screen>
                    :
                    <Screen style={styles.container2} >
                        <TextInput
                            style={styles.input}
                            placeholder='请输入12个助记词,词词之间用空格'
                            autoCapitalize="none"
                            autoCorrect={false}
                            multiline={true}
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('mnemonic', val)}
                        />
                     
                        <View  style={styles.otherSign} >
                            <Caption 
                                styleName="bold"
                                style={styles.rightSign}
                                onPress={() =>  
                                        Navigation.push(this.props.componentId, {
                                        component: {
                                            name: 'TraditionalSignIn',
                                        }
                                    })} 
                                >
                                Email/手机登录
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
        height: 120,
        margin: 5,
        backgroundColor: '#F5F5F5',
        // color: 'white',
        padding: 5,
        paddingLeft: 10,
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
        marginTop:'25%',
        // justifyContent: 'center',
        alignItems: 'center'
    },
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