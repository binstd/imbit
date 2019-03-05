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
    username: '', password: '', email: '', telephone: ''
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  signUp = async () => {
    const { username, password, email, telephone } = this.state
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
    postData['telephone'] = this.state.telephone;  
    let user = await asyncStorageLoad(USER_KEY);
    fetch(`${SERVER_URL}api/users/${userModel.uid}`, {
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'patch'
    }).then(response => response.json()).then( data => {

        user['username'] = this.state.username;

        if(this.state.email != '') {
            user['email'] = this.state.email;
        }

        if(this.state.telephone != '') {
            user['telephone'] = this.state.telephone;  
        }
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
        // telephone:user.telephone
    });
    // console.log('user=>', user)
  }


  render() {
    const { username, email, telephone } = this.state
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

            
            
            <Button 
                styleName="secondary" 
                style={{
                    width: 300,
                    marginTop: 30,
                }}
                onPress={this.commit}
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