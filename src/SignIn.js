import React, { Fragment } from 'react'
import {
    StyleSheet,
} from 'react-native'

import { goHome } from './initNavigation'
import { USER_KEY } from './config'


import { Screen, TextInput, Button, Text, Spinner } from '@shoutem/ui';
import { asyncStorageSave, asyncStorageLoad } from './helpers/asyncStorage';

import ethers from 'ethers';
// let HDNode = ethers.HDNode;
// import bip39 from 'react-native-bip39';
// var hdkey = require('ethereumjs-wallet/hdkey')
// import util from 'ethereumjs-util';
import userModel from './model/userModel';

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
    state = {
        mnemonic: '',
        loading: false
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }

    signIn = () => {
        this.setState({ loading: true });
        let { mnemonic } = this.state;
        if (mnemonic.length != 0) {
            let user = {};
            let wallet = ethers.Wallet.fromMnemonic(mnemonic);
            if (wallet) {
                this.setState({ loading: false });
            }
            user['mnemonic'] = mnemonic.split(" ")
            user['address'] = wallet.address.toLowerCase();
            userModel.allSet(user);
            asyncStorageSave(USER_KEY, user);
            goHome();
        }
    }

    getWalletStorage = async (mnemonic) => {

        const user = await asyncStorageLoad(USER_KEY);
        let wallet = ethers.Wallet.fromMnemonic(mnemonic);
        console.log(wallet.address);
        console.log(wallet.privateKey);
        // let privatekey = this.generateKeyFromSeed(mnemonic);
        // console.log('\n privateKey => \n',privateKey);
        user['address'] = wallet.address.toLowerCase();
        asyncStorageSave(USER_KEY, user);
        userModel.allSet(user);
    }

    // generateKeyFromSeed (value) {
    //     let masterNode = ethers.HDNode.fromMnemonic(value);
    //     let standardEthereum = masterNode.derivePath("m/44'/60'/0'/0/0");
    //     // const seed = ethers.utils.toUtf8Bytes(value);
    //     // const node = ethers.HDNode.fromSeed(seed);
    //     return masterNode.privateKey;
    // }

    static navigatorStyle = {
        topBarElevationShadowEnabled: false
    };

    render() {
        const { loading } = this.state;

        return (
            <Screen style={styles.container}>
                {loading ?
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
                            onPress={() => this.signIn()}
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