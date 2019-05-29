import React, { Fragment } from 'react'
import {
    StyleSheet
} from 'react-native';

import { Screen, TextInput, Button, Text, Spinner } from '@shoutem/ui';

import { observer } from 'mobx-react/native';
import validator from 'validator';
import Toast, { DURATION } from 'react-native-easy-toast';
import transactionModel from '../../model/transactionModel';
// import ethers from 'ethers';
import * as ethers from "ethers";
import {sendTransaction} from '../../helper/Wallet';


export default observer( class TransactionInputScreen extends React.Component {
 
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '转账',
            headerStyle:{
                elevation:0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTitleStyle:{
                fontSize:19,
                alignSelf:'center',
                flex:1, 
                textAlign: 'center'
            }, 
            headerRight: (<View></View>)
        }
    };


    constructor(props) {
        super(props);
        this.state = {
            address: '', 
            isLoading: false,
            amount:null,
            transactionend:false
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

    async doSendTransaction() {
        this.setState({ isLoading: true });
        setTimeout( async () => {
            if(transactionModel.tokenInfo.symbol === 'eth') { //eth
                // console.log('transactionModel.tokenInfo:',transactionModel.tokenInfo.symbol);
                const transaction = {
                    to: this.state.address,
                    value: ethers.utils.parseEther(this.state.amount),
                };
                let result = await sendTransaction(transaction);
                if(result) {
                    this.refs.toast.show('转账成功!', 2000, () => {
                        
                        this.setState({
                            transactionend:true,
                            isLoading:false
                        });
                        this.props.navigation.navigate('Home');  
                    });
                } else {
                    this.refs.toast.show('转账失败！');
                }
             
                console.log(result);
            } else { //contract token
    
            }
        }, 500);
       
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
                        {
                            !this.state.transactionend && 
                           <Spinner />
                        }
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