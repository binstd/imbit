import React, { Fragment } from 'react'
import {
    StyleSheet,
    AsyncStorage,
    Alert
} from 'react-native'

import { goHome } from './initNavigation'
import { USER_KEY } from './config'


import { Screen, View, TextInput, Button, Text } from '@shoutem/ui';
import { asyncStorageSave } from './helpers/asyncStorage';

import 'ethers/dist/shims.js';
import {ethers}  from 'ethers';

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
        mnemonic: ''
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }

    signIn = async () => {
        let { mnemonic } = this.state;
        if (mnemonic.length != 0) {
            let wallet = ethers.Wallet.fromMnemonic(mnemonic);
            let user = {};
            user['mnemonic'] = mnemonic.split(" ")
            user['address'] = wallet.address;
            await asyncStorageSave(USER_KEY, user);
            goHome();
        }
    }

    static navigatorStyle = {
        topBarElevationShadowEnabled: false
    };

    render() {
        return (
            <Screen style={styles.container}>
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
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        height: 100,
        // fontSize: 16,
        // fontWeight: '500',
        // height: 48,
        // backgroundColor: '#42A5F5',
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