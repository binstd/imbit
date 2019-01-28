import React, { Fragment } from 'react'
import {
//   View,
//   Text,
  StyleSheet,
//   TextInput,
//   Button,
  AsyncStorage
} from 'react-native'

import { goHome } from './initNavigation'
import { USER_KEY } from './config'

import {Navigation} from 'react-native-navigation';

import { Screen, View,TextInput,Button,Text } from '@shoutem/ui';
import {asyncStorageSave} from './helpers/asyncStorage';
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
    username: '', password: ''
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  signIn = async () => {
    const { username, password } = this.state
    try {
       // login with provider
    //    asyncStorageSave
       const user = await asyncStorageSave(USER_KEY, {username:username});
       console.log('user successfully signed in!', user)
       goHome()
    } catch (err) {
      console.log('error:', err)
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
          autoCorrect={false}
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
        {/* <TextInput
            placeholder={'Username or email'}
            onChangeText={...}
        /> */}
        <TextInput
          style={styles.input}
          placeholder='Password'
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />

        {/* <Button
          title='s2222'
          onPress={() => {
            Navigation.popTo('app');
          }}
        /> */}

        {/* <Button
          title='登录'
          onPress={this.signIn}
        /> */}
        <Button 
                styleName="secondary" 
                style={{
                    width: 300,
                    marginTop: 30,
                }}
                onPress={this.signIn}
        >
                <Text>登  录</Text>
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