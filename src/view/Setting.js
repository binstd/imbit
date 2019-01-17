
import React from 'react'
import {
//   View,
//   Text,
//   Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native'
import { goToAuth } from '../initNavigation'
// import { goToAuth } from './initNavigation'
// import { Auth } from 'aws-amplify'
import {Navigation} from 'react-native-navigation';
import { USER_KEY } from '../config'

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

  
export default class Setting extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: '设置'
        },
        // leftButtons: [
        //     {
        //         id: 'return',
        //         text: '',
        //         color: '#4F4F4F',
                
        //     }
        // ],
      }
    };
  }

  logout = async () => {
    try {
        console.log('1111!');
      await AsyncStorage.removeItem(USER_KEY)
      goToAuth()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }
  render() {
    return (
        <Screen >
              <ScrollView>
               {/* <Screen styleName="paper"> */}
                    {/* <Button styleName="md-gutter-top"  onPress={() => Navigation.pop(this.props.componentId)}  onPress={this.logout}  >
                    </Button> */}
                     <Button>
                        <Row>
                            <Image
                                styleName=" small"
                                source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-9.png' }}
                            />
                            <Text>完善身份信息</Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>
                    <Divider styleName="line" />

                    <Button>
                        <Row>
                            <Icon name="folder" />
                            <Text>备份身份</Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>
                    <Divider styleName="line" />

                    <Button
                        onPress={() => {
                            Navigation.push(this.props.componentId, {
                            component: {
                                name: 'Screen2',
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
                    <Divider styleName="line" />

                    <Button
                        onPress={() => {
                            Navigation.push(this.props.componentId, {
                            component: {
                                name: 'Screen2',
                            }
                            });
                        }}
                    >
                    <Row>
                        <Icon name="about" />
                        <Text  >关于我们</Text>
                        <Icon styleName="disclosure" name="right-arrow" />
                    </Row>
                    </Button>

                    <Divider styleName="line" />
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
    //   <View style={styles.container}>
    //     <Text>设置</Text>
    //     <Button
    //       onPress={() => Navigation.pop(this.props.componentId)}
    //       title="Go Back"
    //     />
    //   </View>
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