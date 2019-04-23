
import React from 'react'
import {
    StyleSheet,
} from 'react-native'


import { observer } from 'mobx-react/native';
import Blockies from 'react-native-blockies';

import userModel from '../model/userModel';
import UserStore from '../model/UserStore';
import DropDown from '../components/DropDown';
// import { asyncStorageSave, asyncStorageLoad, authTouchID } from '../helpers/asyncStorage';

import validator from 'validator';
import Toast, { DURATION } from 'react-native-easy-toast';
import {
    Button,
    Screen,
    Row,
    Text,
    Icon,
    ScrollView,
    Spinner,
    Switch
} from '@shoutem/ui';

@observer
export default class SettingInfoScreen extends React.Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '设置',
            headerStyle:{
                elevation:0,
                shadowOpacity: 0
            },
            headerTitleStyle:{
                fontSize:19,
                alignSelf:'center',
                flex:1, 
                textAlign: 'center'
            }, 
        }
    };
    

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
        UserStore.logout();
        this.props.navigation.navigate('Auth');
        // if(!await authTouchID('退出身份')) {
        //     this.refs.toast.show('您没有确认指纹无法操作！');
        //     return false;
        // }
        // await AsyncStorage.removeItem(USER_KEY);
        // goToAuth();
        // userModel.clearAll();
        // console.log('login out!!!');
    }

    openTouchId = async(switchOn) => {
        // let switchOn = userModel.openTouchId;

        // if( userModel.openTouchId === true || userModel.openTouchId === false) {
        //     if(!await authTouchID('设置')) {
        //         this.refs.toast.show('您没有确认指纹无法操作!');
        //         return false;
        //     }
        // }
        
        // userModel.openTouchIdSet(switchOn);
        this.setState({ switchOn: switchOn});
        // let user = await asyncStorageLoad(USER_KEY);
        user['openTouchId'] = switchOn;
        // asyncStorageSave(USER_KEY, user);
        
    }

    render() {
        const address = '0xx';//userModel.address;
        // console.log(switchOn); 
        return (
            <Screen >
                {address?
                <ScrollView>
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('SettingUserMain');
                        }}
                    >
                        <Row>
                            <Blockies
                                blockies={address} //string content to generate icon
                                size={40} // blocky icon size
                                style={{ width: 40, height: 40, marginRight: 10, }} // style of the view will wrap the icon
                            />
                            <Text> 完善身份信息 </Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>

                    {
                        userModel.privateKey &&
                        <Button
                            onPress={() => {
                                // Navigation.push(this.props.componentId, {
                                //     component: {
                                //         name: 'MnemonicTold',
                                //     }
                                // });
                            }}
                        >
                            <Row>
                                <Icon name="folder" />
                                <Text>备份身份</Text>
                                <Icon styleName="disclosure" name="right-arrow" />
                            </Row>
                        </Button>
                    }

                    {
                        !userModel.privateKey &&
                        <Button
                            onPress={() => {
                                // Navigation.push(this.props.componentId, {
                                //     component: {
                                //         name: 'BindingMnemonic',
                                //     }
                                // });
                            }}
                        >
                            <Row>
                                <Icon name="folder" />
                                <Text>绑定区块链身份</Text>
                                <Icon styleName="disclosure" name="right-arrow" />
                            </Row>
                        </Button>
                    }

                   <Button >
                        <Row>
                            <Icon name="about" />
                            <Text>选择网络:</Text>
                            
                            <DropDown />
                        </Row>
                    </Button>

                    <Button
                    >
                        <Row>
                            <Icon name="about" />
                            <Text>使用Touch ID: </Text>
                            <Switch
                                onValueChange={value => this.openTouchId(value)}
                                value={this.state.switchOn}
                            />
                            {/* <Icon styleName="disclosure" name="right-arrow" /> */}
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})