


import React, { Fragment } from 'react'
import {
    StyleSheet
} from 'react-native';
// import {Navigation} from 'react-native-navigation';
import { USER_KEY, SERVER_URL } from '../../config';
import { asyncStorageSave, asyncStorageLoad } from '../../helpers/asyncStorage';
import { goHome } from '../../initNavigation'
import { Screen, TextInput, Button, Text, Spinner } from '@shoutem/ui';
import { RegisterUserInfo, CreateUser } from '../../helpers/userFetch';

import { observer } from 'mobx-react/native';
import validator from 'validator';
import Toast, { DURATION } from 'react-native-easy-toast';
import transactionModel from '../../model/transactionModel';
export default observer( class TransactionInput extends React.Component {
  
    static get options() {
        return {
            topBar: {
                noBorder: true,
                title: {
                    text: '转账'
                },
            }
        };
    }


    constructor(props) {
        super(props);
        this.state = {
            username: '', password: '', email: '', isLoading: false,
        }
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    register = async () => {
        const { username, email } = this.state;
        const { telephone, address } = await asyncStorageLoad(USER_KEY);
        if( validator.isEmpty(username)) {
            this.refs.toast.show('用户名不能为空.');
            return;
        }
        // console.log('register,address', address);
        this.setState({ isLoading: true });
        if (username != '' && email != '') {
            setTimeout( async () => {
                if (address) {
                    if (await RegisterUserInfo({ username, email, telephone })) {
                        goHome();
                    }else {
                        this.refs.toast.show('E-mail或用户名重复!');
                        this.setState({ isLoading: false });
                       
                    }
                   
                } else {
                    CreateUser({ username, email, telephone });
                }
            }, 500);
        } else {
            this.setState({ isLoading: false });
        }
    }

    async componentDidMount () {
        console.log('transactionModel.tokenInfo => \n ', transactionModel.tokenInfo.symbol);
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
                            placeholder='目标地址'
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('address', val)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder={`${transactionModel.tokenInfo.symbol}的数量`}
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('amount', val)}
                        />
                        
                        <Button
                            styleName="secondary"
                            style={{
                                width: '90%',
                                marginTop: 50,
                                backgroundColor: '#308EFF',
                                borderColor: '#308EFF',
                            }}
                            onPress={this.register}
                        >
                            <Text>确认</Text>
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
);

const styles = StyleSheet.create({
    input: {
        width: '100%',
        margin: 10,
        padding: 10,
        paddingLeft: 30,
        backgroundColor: 'white',
    },
    container: {
        // backgroundColor: 'white',
    },
    container2: {
        // backgroundColor: 'white',
        flex: 1,
        marginTop: '25%',
        alignItems: 'center'
    },
})