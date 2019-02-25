import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import { goToAuth, goHome } from '../initNavigation'

import { USER_KEY } from '../config'
import { asyncStorageLoad } from '../helpers/asyncStorage';
import { observer } from 'mobx-react/native';
import userModel from '../model/userModel';

// @observer
export default observer(class Initialising extends React.Component {
  //判断登录
  static navigatorStyle = {
    topBarElevationShadowEnabled: false 
  }

  async componentDidMount() {

    try {
      const user = await asyncStorageLoad(USER_KEY);
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
});

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
