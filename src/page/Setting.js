
import React from 'react'
import {
    StyleSheet,
    AsyncStorage,
} from 'react-native'
import { goToAuth, goMnomonic } from '../initNavigation'

import { Switch } from '@shoutem/ui';
import { Navigation } from 'react-native-navigation';
import { USER_KEY } from '../config'
import { observer } from 'mobx-react/native';
import userModel from '../model/userModel';
import Blockies from 'react-native-blockies';
import { asyncStorageSave, asyncStorageLoad, authTouchID } from '../helpers/asyncStorage';
import validator from 'validator';

import Toast, { DURATION } from 'react-native-easy-toast';
import {
    Button,
    Screen,
    Row,
    Text,
    Icon,
    ScrollView,
    Spinner
} from '@shoutem/ui';
// import console = require('console');

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

    constructor(props) {
        super(props);
        this.state = {
            switchOn: false,
            isLoading: true,
        };
    }

    async componentDidMount() {
        this.setState({
            switchOn:userModel.openTouchId,
            isLoading:false,
        });
    }

    logout = async () => {
        await AsyncStorage.removeItem(USER_KEY);
        goToAuth();
        userModel.clearAll();
        // console.log('login out!!!');
    }

    openTouchId = async(switchOn) => {
        // let switchOn = userModel.openTouchId;
        if( userModel.openTouchId === true) {
            if(!await authTouchID('设置')) {
                this.refs.toast.show('您没有确认指纹无法操作！');
                return false;
            }
        }

        userModel.openTouchIdSet(switchOn);
        this.setState({ switchOn: switchOn});
        let user = await asyncStorageLoad(USER_KEY);
        user['openTouchId'] = switchOn;
        asyncStorageSave(USER_KEY, user);
        
    }

    render() {
        const address = userModel.address;
        // console.log(switchOn); 
        return (
            <Screen >
                {address?
                <ScrollView>
                    <Button
                        onPress={() => {
                            Navigation.push(this.props.componentId, {
                                component: {
                                    name: 'SettingMain',
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
                            onPress={() => {
                                Navigation.push(this.props.componentId, {
                                    component: {
                                        name: 'MnemonicTold',
                                    }
                                });
                            }}
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
                                    name: 'Translate',
                                }
                            });
                        }}
                    >
                        <Row>
                            <Icon name="about" />
                            <Text>语言 </Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>

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
                        onPress={() => {
                            // Navigation.push(this.props.componentId, {
                            //     component: {
                            //         name: 'About',
                            //     }
                            // });
                        }}
                    >
                        <Row>
                            <Icon name="about" />
                            <Text>使用Touch ID</Text>
                            <Switch
                                onValueChange={value => this.openTouchId(value)}
                                value={this.state.switchOn}
                            />
                            {/* <Icon styleName="disclosure" name="right-arrow" /> */}
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
                    <Toast
                        ref="toast"
                        position='top'
                        positionValue={150}
                    />
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
    }
})