
import React from 'react'
import {
//   View,
//   Text,
//   Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native'
import { goToAuth, goMnomonic } from '../initNavigation'
// import { goToAuth } from './initNavigation'
// import { Auth } from 'aws-amplify'
import {Navigation} from 'react-native-navigation';
import { USER_KEY } from '../config'
import { observer } from 'mobx-react/native';
import userModel from '../model/userModel';
import Blockies from 'react-native-blockies';

import {
    Button,
    Screen,
    Row,
    Image,
    Text,
    Icon,
    Divider,
    ScrollView
  } from '@shoutem/ui';

// @observer
export default observer( class Setting extends React.Component {
  static get options() {
    return {
      topBar: {
        hideShadow: true,
        noBorder: true,
        title: {
          text: '设置'
        },
        background: {
            translucent: true
        },    
      }
   
    };
  }

  logout = async () => {
    try {
      console.log('1111!');
      await AsyncStorage.removeItem(USER_KEY)
      userModel.clearAll();
      goToAuth()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }

  render() {
    const address = userModel.address;
    return (
        <Screen >
              <ScrollView>
               {/* <Screen styleName="paper"> */}
                    {/* <Button styleName="md-gutter-top"  onPress={() => Navigation.pop(this.props.componentId)}  onPress={this.logout}  >
                    </Button> */}
                     <Button
                        onPress={() => {
                            Navigation.push(this.props.componentId, {
                            component: {
                                name: 'SettingUserInfo',
                            }
                            });
                        }}
                     >
                        <Row>
                            <Blockies
                                blockies={address} //string content to generate icon
                                size={40} // blocky icon size
                                style={{width:40, height:40,marginRight: 10,}} // style of the view will wrap the icon
                            />

                            <Text>完善身份信息</Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>

                    {/* <Divider styleName="line" /> */}

                    <Button
                        onPress={goMnomonic}
                    >
                        <Row>
                            <Icon name="folder" />
                            <Text>备份身份</Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>
                    
                    {/* <Divider styleName="line" /> */}

                    <Button
                        onPress={() => {
                            Navigation.push(this.props.componentId, {
                            component: {
                                name: 'Translate',
                            }
                            });
                        }}
                    >
                        <Row>
                            <Icon name="web" />
                            <Text>语言切换</Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>

                    {/* <Divider styleName="line" /> */}

                    <Button
                        onPress={() => {
                            Navigation.push(this.props.componentId, {
                                component: {
                                    name: 'About',
                                }
                            });
                        }}
                    >

                    <Row>
                        <Icon name="about" />
                        <Text >关于我们</Text>
                        <Icon styleName="disclosure" name="right-arrow" />
                    </Row>

                    </Button>

                    {/* <Divider styleName="line" /> */}

                    <Button
                        onPress={this.logout}
                    >
                        <Row 
                          
                        >
                            <Icon name="turn-off" />
                            <Text >退出身份</Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>

            {/* </Screen> */}
            </ScrollView>
        </Screen>

    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})