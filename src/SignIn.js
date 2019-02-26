import React, { Fragment } from 'react'
import {
    StyleSheet
} from 'react-native'

import { Navigation } from 'react-native-navigation';
import { goHome } from './initNavigation'
import { USER_KEY } from './config'


import { Screen, TextInput, Text, Spinner, Button } from '@shoutem/ui';
import { asyncStorageSave, asyncStorageLoad } from './helpers/asyncStorage';

// import ethers from 'ethers';
import {hasAddress} from './helpers/userFetch';
import {loadWallet} from './helpers/wallet';

import userModel from './model/userModel';
import { goUserInfo } from './initNavigation';

export default class SignIn extends React.Component {
    static get options() {
        return {
            topBar: {
                title: {
                    text: '登录'
                },
            }
        };
    }
    constructor(props) {
		super(props);
		this.state = {
            mnemonic: '',
            isLoading: false
		};
	}
   
    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }

    async signIn (){
        let { mnemonic } = this.state;
        this.setState({ isLoading: true });
        if (mnemonic.length != 0) {
            setTimeout(() => {
               this.saveWallet(mnemonic);
            }, 500);
        } else {
            this.setState({ isLoading: false });
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
                    <Spinner /> :
                    <Screen style={styles.container} >
                        <TextInput
                            style={styles.input}
                            placeholder='请输入12个助记词,词词之间用空格'
                            autoCapitalize="none"
                            autoCorrect={false}
                            multiline={true}
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('mnemonic', val)}
                        />

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
                            <Text>登陆身份</Text>
                        </Button>
                    </Screen>}

            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        height: 100,

        margin: 10,
        // color: 'white',
        padding: 10,
        paddingLeft: 10,
        // borderRadius: 14
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})