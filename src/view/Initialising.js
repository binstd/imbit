import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native'

import { goToAuth, goHome } from '../initNavigation'

import { USER_KEY } from '../config'
import { asyncStorageSave, asyncStorageLoad } from '../helpers/asyncStorage';
import { observer } from 'mobx-react/native';
import userModel from '../model/userModel';

@observer
export default class Initialising extends React.Component {
  //判断登录
  static navigatorStyle = {
    topBarElevationShadowEnabled: false 
  }

  async componentDidMount() {
    // console.log('asyncStorageLoad: \n',await asyncStorageLoad(USER_KEY));  
    try {
      const user = await asyncStorageLoad(USER_KEY);
    //   const user = await AsyncStorage.getItem(USER_KEY)
      console.log('user=>', user)
      if (user) {
        userModel.allSet(user);
        goHome()
      } else {
        goToAuth()
      }
    } catch (err) {
      console.log('error: ', err)
      goToAuth()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
