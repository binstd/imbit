import React, { Fragment } from 'react'
import {
  StyleSheet
} from 'react-native'
import {Navigation} from 'react-native-navigation';

import { Screen, View,TextInput,Button,Text } from '@shoutem/ui';
import {CreateUser} from './helpers/userFetch';
export default class SignUp extends React.Component {
  state = {
    username: '', password: '', email: '', phone_number: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  signUp = () => {
    const { username,  email, phone_number } = this.state;
    //username, email, telephone
    if(username != ''&& phone_number != '') {
        CreateUser({username,email,telephone:phone_number});
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
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
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
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 300,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})