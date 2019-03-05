import React, { Fragment } from 'react'
import {
    StyleSheet
} from 'react-native'

// import {Navigation} from 'react-native-navigation';
import { USER_KEY, SERVER_URL } from '../config';
import { asyncStorageSave, asyncStorageLoad } from '../helpers/asyncStorage';
import { goHome } from '../initNavigation'
import { Screen, TextInput, Button, Text, Spinner } from '@shoutem/ui';
import { RegisterUserInfo, CreateUser } from '../helpers/userFetch';

export default class Register extends React.Component {
    static get options() {
        return {
            topBar: {
                hideShadow: true,
                noBorder: true,
                title: {
                    text: '补充用户信息'
                },
                background: {
                    translucent: true
                },
            }
        };
    }
    state = {
        username: '', password: '', email: '', isLoading: false,
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    register = async () => {
        const { username, email } = this.state;
        const { telephone, address } = await asyncStorageLoad(USER_KEY);
        console.log('register,address', address);

        this.setState({ isLoading: true });
        if (username != '' && email != '') {
            setTimeout(() => {
                if (address) {
                    RegisterUserInfo({ username, email, telephone }) 
                    goHome();
                } else {
                    CreateUser({ username, email, telephone });
                }
            }, 500);
        } else {
            this.setState({ isLoading: false });
        }
    }

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
                            placeholder='Username'
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('username', val)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('email', val)}
                        />

                        <Button
                            styleName="secondary"
                            style={{
                                width: 300,
                                marginTop: 30,
                            }}
                            onPress={this.register}
                        >
                            <Text>注  册</Text>
                        </Button>
                    </Screen>
                }
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        margin: 10,
        padding: 10,
        paddingLeft: 30,
        backgroundColor: '#F5F5F5',
    },
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
    },
    container2: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: '25%',
        alignItems: 'center'
    },
})