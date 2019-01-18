import React, { Fragment } from 'react'
import {
//   View,
//   Text,
  StyleSheet,
//   TextInput,
//   Button,
  AsyncStorage
} from 'react-native'

import { goHome } from '../initNavigation'
import { USER_KEY } from '../config'

import {Navigation} from 'react-native-navigation';

import { Screen, View,TextInput,Button,Text } from '@shoutem/ui';
export default class Confirm extends React.Component {
    static get options() {
        return {
            topBar: {
                title: {
                    text: '助记词备份确认'
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
       const user = await AsyncStorage.setItem(USER_KEY, username)
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
        <Text>11111111111111111111</Text>
        {/* <Button 
                styleName="secondary" 
                style={{
                    width: 300,
                    marginTop: 30,
                }}
                // onPress={this.signIn}
        >
                <Text>备份身份</Text>
        </Button> */}
        <Button 
                styleName="secondary" 
                style={{
                    width: 300,
                    marginTop: 30,
                }}
                onPress={goHome}
        >
                <Text>确认</Text>
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