import React, { Fragment } from 'react'
import {
  StyleSheet
} from 'react-native'

// import { goMnomonic } from '../initNavigation'
import { Screen, View, TextInput,Button,Text } from '@shoutem/ui';

import { observer } from 'mobx-react/native';
import userModel from '../model/userModel';

@observer
export default class SettingUserInfo extends React.Component {
    static get options() {
        return {
                topBar: {
                hideShadow: true,
                noBorder: true,
                title: {
                    text: '完善个人信息'
                },
                background: {
                    translucent: true
                },
            }
       
        };
    }

  state = {
    username: '', password: '', email: '', phone_number: ''
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  signUp = async () => {
    const { username, password, email, phone_number } = this.state
    try {
      // here place your signup logic
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }

  commit = async () => {

  }

  static navigatorStyle = {
    topBarElevationShadowEnabled: false 
  };

  render() {
    return (
       <Screen style={styles.container}>
        <Screen style={styles.containerData}>
            <TextInput
            style={styles.input}
            placeholder='用户名'
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
                    onPress={this.commit}
                    // onPress={this.signIn}
                >
                    <Text>保存</Text>
                </Button>
            </Screen>
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

  },
//   container: {
//     // backgroundColor: 'white',
   
   
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
  containerData: {
    marginTop:100,
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  } 

})