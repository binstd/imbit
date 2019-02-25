import React, { Fragment } from 'react'
import {
  StyleSheet
} from 'react-native'

// import { goMnomonic } from '../initNavigation'
import { Screen, View, TextInput,Button,Text } from '@shoutem/ui';

import { observer } from 'mobx-react/native';
import userModel from '../model/userModel';

import { USER_KEY,SERVER_URL } from '../config'
import { asyncStorageSave, asyncStorageLoad } from '../helpers/asyncStorage';

// @observer
export default observer(class SettingUserInfo extends React.Component {
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
    let postData = {};
    // user['publicAddress'] = userModel.address;
    postData['username'] = this.state.username;
    postData['email'] = this.state.email;
    postData['telephone'] = this.state.phone_number;  
    let user = await asyncStorageLoad(USER_KEY);
    fetch(`${SERVER_URL}api/users/${userModel.uid}`, {
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'patch'
    }).then(response => response.json()).then( data => {
        console.log('修改后的:\n',data);

        user['username'] = this.state.username;
        user['email'] = this.state.email;
        user['telephone'] = this.state.phone_number;  
        asyncStorageSave(USER_KEY, user);
        userModel.allSet(user);
    });
  }

  static navigatorStyle = {
    topBarElevationShadowEnabled: false 
  };


  async componentDidMount() {
    const user = await asyncStorageLoad(USER_KEY);
    userModel.allSet(user);
    this.setState({
        username:user.username,
        email:user.email,
        phone_number:user.telephone
    });
    console.log('user=>', user)
    // if (user) {
    //   userModel.allSet(user);
  }


  render() {
    const { username, email, phone_number } = this.state
    return (
       <Screen style={styles.container}>
        <Screen style={styles.containerData}>
            <TextInput
            style={styles.input}
            placeholder='用户名'
            value = {username}
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('username', val)}
            />
           
            <TextInput
                style={styles.input}
                placeholder='email'
                value = {email}
                autoCapitalize="none"
                placeholderTextColor='white'
                onChangeText={val => this.onChangeText('email', val)}
            />
            <TextInput
                style={styles.input}
                placeholder='手机号'
                value = {phone_number}
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
});

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