import React, { Fragment } from 'react'
import {
    StyleSheet
} from 'react-native'

import { Navigation } from 'react-native-navigation';
import { goHome } from '../initNavigation'
import { USER_KEY } from '../config'


import { Screen, TextInput, Text, Spinner, Button, Caption, View, ScrollView, TouchableOpacity, Divider } from '@shoutem/ui';
import { asyncStorageSave, asyncStorageLoad } from '../helpers/asyncStorage';


import { hasAddress } from '../helpers/userFetch';
import { loadWallet } from '../helpers/wallet';

import userModel from '../model/userModel';
import { goUserInfo } from '../initNavigation';

import validator from 'validator';
import Toast, { DURATION } from 'react-native-easy-toast';
export default class SignIn extends React.Component {
    static get options() {
        return {
            topBar: {
                elevation: 0,
                borderColor: 'white',
                borderHeight: 0,
                title: {
                    text: '登录',
                    alignment: "center"
                },
                backButton: {
                    visible: false,
                },
                navBarNoBorder: true,
                hideShadow: true,
                noBorder: true,
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

    async signIn() {
        let { mnemonic } = this.state;
        let mnemonicList = mnemonic.split(" ");
        console.log(mnemonicList.length);
        if (mnemonicList.length != 12) {
            this.refs.toast.show('助记词仅支持用空格隔开的12个单词！');
            return;
        } else {
            this.setState({ isLoading: true });
            setTimeout(() => {
                this.saveWallet(mnemonic);
            }, 500);
        }
    }

    async saveWallet(mnemonic) {
        userModel.clearAll();
        let wallet = await loadWallet(mnemonic);
        if (!wallet) {
            this.setState({
                isLoading: false,
            });
            this.refs.toast.show('无法创建区块链身份,请检测助记词是否正确！');
        }
        let result = await hasAddress(wallet.address);
        if (result == 1) {
            this.setState({
                isLoading: false,
            });
            goHome();
        } else {
            // console.log('SettingTelephone!');
            this.setState({
                isLoading: false,
            });
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'SettingTelephone',
                }
            })

        }
    }

    // static navigatorStyle = {
    //     topBarElevationShadowEnabled: false
    // };

    render() {

        return (
            <Screen style={styles.container}  >
                {this.state.isLoading ?
                    <Screen style={styles.container2} >
                        <Spinner />
                    </Screen>
                    :
                    <Screen >
                        <View style={styles.header} >
                            <TouchableOpacity
                                style={styles.headerOne}
                            >
                                <Text style={styles.headerTextSelected}> 助记词</Text>
                                <Divider
                                    styleName="line"
                                    style={styles.headerLine}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.headerOne}
                                onPress={() => {
                                    Navigation.push(this.props.componentId, {
                                        component: {
                                            name: 'TraditionalSignIn',
                                        }
                                    });
                                }}
                            >
                                <Text
                                    style={styles.headerText}
                                >
                                   手机号
                                </Text>
                            </TouchableOpacity>
                        </View>

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

                            <Button
                                styleName="secondary"
                                style={styles.buttonSign}
                                onPress={() => this.signIn()}
                            >
                                <Text style={styles.buttonText}>登录</Text>
                            </Button>

                            <View style={styles.otherSign} >
                                <Caption
                                    styleName="bold"
                                    style={styles.footerSign}
                                >
                                    首次登录会自动创建新账户
                                </Caption>
                            </View>
                        </Screen>
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
        width: '100%',
        height: 120,
        backgroundColor: 'white',
        padding: 50,
        alignItems: 'center',
        // textAlign: 'center',
    },
    header: {
        height: 45,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    headerOne: {
        // marginTop:45,
        width: '50%',
        height: '100%',
        padding: 'auto',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 17
    },
    headerTextSelected: {
        fontSize: 17,
        color: '#000000'
    },
    headerLine: {
        width: 25,
        height: 4,
        backgroundColor: '#308EFF',
        margin: 'auto',
        marginBottom: 0,
    },
    container: {
        // backgroundColor: 'white',
        // backgroundColor: 'white',
    },
    container2: {
        // backgroundColor: 'white',
        flex: 1,
        marginTop: 10,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    otherSign: {
        width: 300,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    rightSign: {
        // justifyContent: '',
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
        borderColor: '#308EFF',
    },
    buttonText: {
        fontSize: 18,
    }
})