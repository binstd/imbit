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

import { Screen, View, TextInput, Button, Text, Divider } from '@shoutem/ui';
export default class Told extends React.Component {
    static get options() {
        return {
            topBar: {
                noBorder: true,
                title: {
                    text: '提示'
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
        <Screen styleName="paper"
            style={{
                flex: 1,  
                // justifyContent: 'center',
                marginTop: 100,
                height: 80,
                // marginBottom: 10,
                
            }}
        >
            <Text styleName="md-gutter multiline"
             style={{
                marginTop: 1,
                marginBottom: 1,
            }}
            >
                请确认您的周围无人，确保周围没有摄像头的环境下备份。
            </Text>
            <Text styleName="md-gutter multiline"
             style={{
                marginTop: 1,
                marginBottom: 1,
            }}
            >
            
                因为如果他人获取您的助记词，将会对您的身份下的全部数据和资产造成损害。
            </Text>
            <Text styleName="md-gutter multiline" 
             style={{
                marginTop: 1,
                marginBottom: 1,
            }}
            >
                请抄下助记词，并存在在安全的地方。
            </Text>
        </Screen>
        <Divider styleName="line" />
        <View
          style={{
                flex: 1,  
                justifyContent: 'center',
                marginBottom: 100,
            }}
        >  
            <Button 
                    styleName="secondary" 
                    style={{
                        width: 300,
                        marginTop: 10,
                    }}
                    // onPress={this.signIn}
                    onPress={() => {
                            Navigation.push(this.props.componentId, {
                            component: {
                                name: 'MnemonicBackup',
                            }
                        });
                    }}
            >
                    <Text>备份身份</Text>
            </Button>
            <Button 
                    styleName="secondary" 
                    style={{
                        width: 300,
                        marginTop: 30,
                    }}
                    onPress={goHome}
            >
                    <Text>稍后备份</Text>
            </Button>
        </View>
       
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})