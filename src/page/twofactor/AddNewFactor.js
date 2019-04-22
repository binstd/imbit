


import React, { Fragment } from 'react'
import {
    StyleSheet
} from 'react-native';

import { Screen, TextInput, Button, Text, Spinner } from '@shoutem/ui';

import { observer } from 'mobx-react/native';
import validator from 'validator';
import Toast, { DURATION } from 'react-native-easy-toast';
import factorStore from '../../model/factorStore';
export default class AddNewFactorScreen extends React.Component {
  
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '添加新验证码',
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
           name: '', address: '', isLoading: false,
        }
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val });
    }

    addfactor = async () => {
        const { name, startCode } = this.state;
        if( validator.isEmpty(startCode) ) {
            this.refs.toast.show('原始码不能为空');
            return;
        }

        if( validator.isEmpty(name) ) {
            this.refs.toast.show('备注名称不能为空.');
            return;
        }
        
        this.setState({ isLoading: true });
        if (name != '' && startCode != '') {
            setTimeout( () => {

                factorStore.factorPush({ name, startCode });
                this.props.navigation.navigate('TwoFactorList');
                this.setState({ isLoading: false });  
            }, 500);

        } else {
            this.setState({ isLoading: false });
        }
    }

    async componentDidMount () {

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