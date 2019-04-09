


import React, { Fragment } from 'react'
import {
    StyleSheet
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import { USER_KEY, SERVER_URL } from '../../config';
import { asyncStorageSave, asyncStorageLoad } from '../../helpers/asyncStorage';
import { goHome } from '../../initNavigation'
import { Screen, TextInput, Button, Text, Spinner } from '@shoutem/ui';
import { RegisterUserInfo, CreateUser } from '../../helpers/userFetch';

import { observer } from 'mobx-react/native';
import validator from 'validator';
import Toast, { DURATION } from 'react-native-easy-toast';
import factorModel from '../../model/factorModel';
export default observer( class AddNewFactor extends React.Component {
  
    static get options() {
        return {
            topBar: {
                elevation: 0,
                noBorder: true,
                navBarNoBorder: true,
                hideShadow: true,
                title: {
                    text: '添加新验证码',
                    alignment: "center"
                },
            }
        };
    }


    constructor(props) {
        super(props);
        this.state = {
           name: '', address: '', isLoading: false,
        }
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val });
    }

    addfactor = async () => {
        const { name, startCode } = this.state;
        // const { telephone, startCode } = await asyncStorageLoad(USER_KEY);
        if( validator.isEmpty(startCode) ) {
            this.refs.toast.show('原始码不能为空');
            return;
        }

        if( validator.isEmpty(name) ) {
            this.refs.toast.show('备注名称不能为空.');
            return;
        }
        
        // console.log('register,startCode', startCode);
        this.setState({ isLoading: true });
        if (name != '' && startCode != '') {
            setTimeout( async () => {
                await factorModel.factorPush({ name, startCode});
                await asyncStorageSave('Factor',factorModel.getFactorData.toJS());
                Navigation.push(this.props.componentId, {
                    component: {
                        name: 'TwoFactorList',
                    }
                });
                this.setState({ isLoading: false });  
                
            }, 500);
        } else {
            this.setState({ isLoading: false });
        }
    }

    async componentDidMount () {
        // console.log('transactionModel.tokenInfo => \n ', transactionModel.tokenInfo.symbol);
        
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
                            placeholder='原始码'
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('startCode', val)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder={`备注名称`}
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('name', val)}
                        />

                        <Button
                            styleName="secondary"
                            style={{
                                width: '90%',
                                marginTop: 50,
                                backgroundColor: '#308EFF',
                                borderColor: '#308EFF',
                            }}
                            onPress={this.addfactor}
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