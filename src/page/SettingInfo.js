
import React from 'react'
import {
    StyleSheet,
} from 'react-native'


import { observer } from 'mobx-react/native';
import Blockies from 'react-native-blockies';

// import userModel from '../model/userModel';
import UserStore from '../model/UserStore';
import DropDown from '../components/DropDown';
// import { asyncStorageSave, asyncStorageLoad, authTouchID } from '../helpers/asyncStorage';
import {authTouchID} from '../helper/Common';
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
import {loadAddress,loadPrivateKey } from '../helper/Wallet';

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
            hasPrivateKey:true,
        };
    }

    async componentDidMount() {
        let privateKey  = await loadPrivateKey();
        this.setState({
            switchOn: UserStore.openTouchId,
            isLoading:false,
            hasPrivateKey:privateKey?true:false,
        });
    }

    logout = async () => {
        if(!await authTouchID('退出身份')) {
            this.refs.toast.show('您没有确认指纹无法操作!');
            return false;
        }
        UserStore.logout();
        this.props.navigation.navigate('Auth');
    }

    openTouchId = async ( switchOn ) => {
        if(!await authTouchID('设置', true)) {
            this.refs.toast.show('您没有确认指纹无法操作!');
            return false;
        }
        UserStore.login({openTouchId: switchOn});
        this.setState({ switchOn: switchOn});
    }

    render() {
        const address = '0xx';//userModel.address;
        const { hasPrivateKey } = this.state;
        console.log('hasPrivateKey => \n', hasPrivateKey);
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
                        hasPrivateKey &&
                        <Button
                            onPress={() => {
                                this.props.navigation.navigate('MnemonicTold');
                                // 
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
                        !hasPrivateKey &&
                        <Button
                            onPress={() => {
                                
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
                            this.props.navigation.navigate('About');
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