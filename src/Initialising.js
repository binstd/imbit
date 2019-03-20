import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import { goToAuth, goHome } from './initNavigation'

import { USER_KEY } from './config'
import { asyncStorageLoad,asyncStorageSave } from './helpers/asyncStorage';
import { observer } from 'mobx-react/native';
import userModel from './model/userModel';

import Reactotron from 'reactotron-react-native';
import {
    Image
} from '@shoutem/ui';
// import ic_launcher from './img/ic_launcher.png';

// @observer
export default observer(class Initialising extends React.Component {

  //判断登录
  static navigatorStyle = {
    topBarElevationShadowEnabled: false 
  }

  async componentDidMount() {
    Reactotron.log('hello rendering world');
    try {
      const user = await asyncStorageLoad(USER_KEY);
      if (user) {
        userModel.allSet(user);
        goHome()
      } else {
        // await asyncStorageSave(USER_KEY, {});
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
        {/* <Text style={styles.welcome}>IMbit</Text> */}
            <Image
                styleName="small"
                // source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png'}}
                source={require('./img/ic_launcher.png')}
            />
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
