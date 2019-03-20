
import React from 'react'
import {
    StyleSheet,
    AsyncStorage,
} from 'react-native'
import { goToAuth, goMnomonic } from '../initNavigation'
// import { goToAuth } from './initNavigation'
// import { Auth } from 'aws-amplify'
import { Navigation } from 'react-native-navigation';
import { USER_KEY } from '../config'
import { observer } from 'mobx-react/native';
import userModel from '../model/userModel';
import Blockies from 'react-native-blockies';

import {
    Button,
    Screen,
    Row,
    Text,
    Icon,
    ScrollView
} from '@shoutem/ui';

// @observer
export default observer( class Setting extends React.Component {
    static get options() {
        return {
            topBar: {
                hideShadow: true,
                noBorder: true,
                elevation: 0,
                title: {
                    text: '设置',
                    alignment: "center"
                },
                background: {
                    translucent: true
                },
            }
        };
    }

    logout = async () => {
        await AsyncStorage.removeItem(USER_KEY)
        // userModel.clearAll();
        goToAuth();
        console.log('login out!!!');
        // try {
        //     //   console.log('1111!');
        //     AsyncStorage.removeItem(USER_KEY)
        //     userModel.clearAll();
        //     goToAuth();
        // } catch (err) {
        //     console.log('error signing out...: ', err)
        // }
    }

    // logout = async () => {
    //     try {
    //     //   console.log('1111!');
    //       await AsyncStorage.removeItem(USER_KEY)
    //       userModel.clearAll();
    //       goToAuth()
    //     } catch (err) {
    //       console.log('error signing out...: ', err)
    //     }
    // }

    render() {
        const address = userModel.address;
        return (
            <Screen >
                <ScrollView>
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
                                style={{ width: 40, height: 40, marginRight: 10, }} // style of the view will wrap the icon
                            />
                            <Text>完善身份信息</Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>

                    {
                        userModel.privateKey &&
                        <Button
                            onPress={goMnomonic}
                        >
                            <Row>
                                <Icon name="folder" />
                                <Text>备份身份</Text>
                                <Icon styleName="disclosure" name="right-arrow" />
                            </Row>
                        </Button>
                    }

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
                            <Text>关于我们 (当前版本:0.79) </Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>

                    <Button
                        onPress={this.logout}
                    >
                        <Row>
                            <Icon name="turn-off" />
                            <Text>{`退出身份`}</Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>
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