import React, { Fragment } from 'react'
import {
    StyleSheet
} from 'react-native'
import { Navigation } from 'react-native-navigation';

import { Screen, View, TextInput, Button, Text, Spinner } from '@shoutem/ui';
import { CreateUser } from '../helpers/userFetch';

import validator from 'validator';
import Toast, { DURATION } from 'react-native-easy-toast';
export default class SignUp extends React.Component {
    static get options() {
        return {
            topBar: {
                title: {
                    text: ''
                },
                backButton: {
                    visible: false
                },
                navBarNoBorder: true,
                hideShadow: true,
                noBorder: true,
                rightButtons: [
                    {
                        id: 'SignIn',
                        // icon: <Icon name="sidebar" />,
                        text: '已有身份？',
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
            username: '',
            password: '',
            email: '',
            phone_number: '',
            isLoading: false
        };
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }

    navigationButtonPressed({ buttonId }) {
        console.log('buttonId => ', buttonId);
        if (buttonId === 'SignIn') {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'SignIn',
                }
            });
        }
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    signUp = () => {
        const { username, email, phone_number } = this.state;
        if (!validator.isMobilePhone(phone_number, ['zh-CN', 'zh-HK', 'zh-TW'])) {
            this.refs.toast.show('请输入正确的手机号');
            return;
        }

        if (!validator.isEmail(email)) {
            this.refs.toast.show('请输入正确的E-mail')
            return;
        }

        this.setState({ isLoading: true });
        if (username != '' && phone_number != '') {
            setTimeout(() => {
                CreateUser({ username, email, telephone: phone_number }).then((result) => {
                    if(!result){
                        this.refs.toast.show('账户或手机号已被使用!');
                        this.setState({ isLoading: false });
                    }
                });
            }, 500);
        } else {
            this.setState({ isLoading: false });
        }
    }

    static navigatorStyle = {
        topBarElevationShadowEnabled: false
    };

    render() {
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
                            placeholder='用户名'
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('username', val)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='邮箱'
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('email', val)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='手机号'
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('phone_number', val)}
                        />

                        <Button
                            styleName="secondary"
                            style={{
                                width: 300,
                                marginTop: 30,
                            }}
                            onPress={this.signUp}
                        >
                            <Text>注  册</Text>
                        </Button>
                    </Screen>
                }
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
        backgroundColor: '#F5F5F5',
        // fontSize: 16,
        // fontWeight: '500',
        // height: 48,
        // backgroundColor: '#42A5F5',
        margin: 10,
        // color: 'white',
        padding: 10,
        paddingLeft: 30,
        // borderRadius: 14
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
})