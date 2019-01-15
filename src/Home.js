import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import { goToAuth } from './navigation'
import {Navigation} from 'react-native-navigation';

import { USER_KEY } from './config'
import { Button,Row,Image, Text} from '@shoutem/ui';

export default class Home extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home'
        },
      }
    };
  }
  logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY)
      goToAuth()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }
  render() {
    console.log('props; ', this.props)
    return (
      <View >
        {/* <Text>Hello from Home s222creen.111</Text> */}
        {/* <Button
          onPress={this.logout}
          title="Sign Out"
        /> */}
        <Button  styleName="full-width">
            <Text>扫一扫</Text>
        </Button>
        <Row styleName="small">
            <Image
                styleName="small-avatar"
                source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-9.png' }}
            />
            <Text>Add comment</Text>
        </Row>
        {/* <Button
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'Screen2',
              }
            });
          }}
          title="View next screen"
        /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})