
import React from 'react'
import {
    StyleSheet,
    AsyncStorage,
} from 'react-native'
import { goToAuth } from '../../initNavigation'

import { Navigation } from 'react-native-navigation';
import { USER_KEY } from '../../config'
import { observer } from 'mobx-react/native';
import userModel from '../../model/userModel';
// import Blockies from 'react-native-blockies';

import {
    Button,
    Screen,
    Row,
    Text,
    Icon,
    ScrollView,
    Spinner
} from '@shoutem/ui';

// @observer
export default observer( class SettingMain extends React.Component {
    
    static get options() {
        return {
            topBar: {
                hideShadow: true,
                noBorder: true,
                elevation: 0,
                title: {
                    text: '个人信息设定',
                    alignment: "center"
                },
                background: {
                    translucent: true
                },
            }
        };
    }

    logout = async () => {
        await AsyncStorage.removeItem(USER_KEY);
        goToAuth();
        userModel.clearAll();
        // console.log('login out!!!');
    }

    render() {
        const address = userModel.address;
        return (
            <Screen >
                {address?
                <ScrollView>
                    <Button
                        onPress={() => {
                            Navigation.push(this.props.componentId, {
                                component: {
                                    name: 'SettingUserMainInfo',
                                }
                            });
                        }}
                    >
                        <Row>
                            <Text   >邮箱</Text>
                            <Text style={styles.leftRow} > {userModel.email} </Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>

                    <Button
                        onPress={() => {
                            Navigation.push(this.props.componentId, {
                                component: {
                                    name: 'SettingUserMainInfo',
                                }
                            });
                        }}
                    >
                        <Row>
                            <Text >用户名</Text>
                            <Text style={styles.leftRow} >  {userModel.username}  </Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>

                    {
                        userModel.privateKey &&
                        <Button
                            onPress={() => {
                                Navigation.push(this.props.componentId, {
                                    component: {
                                        name: 'SetttingNewTelephone',
                                    }
                                });
                            }}
                        >
                            <Row>
                                {/* <Icon name="folder" /> */}
                                <Text  >更换手机号</Text>
                                <Icon styleName="disclosure" name="right-arrow" />
                            </Row>
                        </Button>
                    }

                </ScrollView>
                :
                    <Spinner />
                }
            </Screen>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftRow:{
      color:'#000000',
      fontSize: 14,
    }
})