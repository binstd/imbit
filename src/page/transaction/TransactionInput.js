import React, { Fragment } from 'react'
import {
    StyleSheet
} from 'react-native';

import { Screen, TextInput, Button, Text, Spinner } from '@shoutem/ui';

import { observer } from 'mobx-react/native';
import validator from 'validator';
import Toast, { DURATION } from 'react-native-easy-toast';
import transactionModel from '../../model/transactionModel';
import ethers from 'ethers';

import {sendTransaction} from '../../helper/Wallet';


export default observer( class TransactionInputScreen extends React.Component {
 
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '转账',
            headerStyle:{
                elevation:0,
                shadowOpacity: 0
            },
            headerTitleStyle:{
                fontSize:19,
                alignSelf:'center',
                flex:1, 
                textAlign: 'center'
            }, 
        }
    };


    constructor(props) {
        super(props);
        this.state = {
            username: '', password: '', address: '', isLoading: false,
        }
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val });
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
                        // goHome();
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

    doSendTransaction() {
        console.log('transactionModel.tokenInfo:',transactionModel.tokenInfo.symbol);
        if(transactionModel.tokenInfo.symbol === 'eth') { //eth

        } else { //contract token

        }
        // const transaction = {
        //     nonce: 0,
        //     gasLimit: config.gasLimit,
        //     gasPrice: gasPrice,
        //     to: to,
        //     value: ethers.utils.parseEther(amount),
        // };
        // sendTransaction(transaction)
    } 

    async sendERC20transaction() {
        var contract = new ethers.Contract(address, abi, provider);
        var transaction = contract.transfer(newAddress, 10);
        sendTransaction(transaction)
    }

    async componentDidMount () {
        this.setState({
            address:transactionModel.toaddress,
            // isLoading:true,
        });
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
                            defaultValue={this.state.address}
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
                            onPress={()=> this.doSendTransaction() }
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