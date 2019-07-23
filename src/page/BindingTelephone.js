import React, { Fragment } from 'react'
import {
    StyleSheet
} from 'react-native'

import { Navigation } from 'react-native-navigation';

import { Screen, TextInput, Text, Spinner, Button, Caption, View,TouchableOpacity,Divider } from '@shoutem/ui';
import { asyncStorageSave, asyncStorageLoad } from '../helpers/asyncStorage';

import { hasTelephone } from '../helpers/userFetch';

import { goHome, goUserInfo } from '../initNavigation';

// import { USER_KEY,SERVER_URL } from '../config';
import {USER_KEY,SERVER_URL} from '../helper/Config';
import validator from 'validator';
import Toast, { DURATION } from 'react-native-easy-toast';

import timerModel from '../model/timerModel';
import { observer } from 'mobx-react/native';

export default SettingTelephone = observer( class SettingTelephone extends React.Component {
    static get options() {
        return {
            topBar: {

                elevation: 0,

                translucent:true,
                blur:false,
                borderColor: 'white',
                borderHeight: 0,
                title: {
                    text: '添加手机号',
                    alignment: "center"
                },
                backButton: {
                    visible: false
                },
                navBarNoBorder: true,
                hideShadow: true,
                noBorder: true,
                leftButtons: [],
            }
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            telephone: '',
            code: '',
            realCode:'',
            reTime:59,
            isLoading: false,
            isSending: false
        };
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }

    navigationButtonPressed({ buttonId }) {
        // console.log('buttonId => ', buttonId);
        if (buttonId === 'SignUp') {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'SignUp',
                }
            });
        }
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }

    async getMassegeCode() {
        // console.log('拒绝呀!');
        const { telephone, code } = this.state;
        if (!validator.isMobilePhone(telephone, ['zh-CN', 'zh-HK', 'zh-TW'])) {
            this.refs.toast.show('请输入正确的电话号码');
        } else {
            // this.setState({ isSending: true });
            fetch(`${SERVER_URL}/api/virify/massegecode?telephone=${telephone}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then( data => {
                console.log(data);
                timerModel.reset();
                this.setState({
                    realCode:data.code,
                    isSending:true
                });
            });

        }

    }

    virifyMassegeCode() {

        const { telephone, code, realCode} = this.state;
        // console.log(telephone);
        if (!validator.isMobilePhone(telephone, ['zh-CN', 'zh-HK', 'zh-TW'])) {
            this.refs.toast.show('请输入正确的电话号码!');
        }

        if (!validator.isByteLength(code, { min: 6, max: 6 })) {
            this.refs.toast.show('请输入您接收到的验证码!');
        }

        if(realCode == code) {
            this.setState({ isLoading: true });
            setTimeout(() => {
                this.toPage();
            }, 500);
        } else {
            this.refs.toast.show('您输入的验证码是错误的!');
        }
    }

    async toPage() {
        const { telephone } = this.state;
        let user = await asyncStorageLoad(USER_KEY)?await asyncStorageLoad(USER_KEY):{};
        user.telephone = telephone;
        await asyncStorageSave(USER_KEY, user);

        // 判断是新用户还是老用户,登录验证
        if(await hasTelephone(telephone) == 1) {
            this.setState({
                isLoading: false,
            });

            if(user['address']) {
                timerModel.reset();
                this.refs.toast.show('该手机号已被使用，请更换新手机号重试!');
                return;
            } else {
                goHome();
            }

        } else {
            this.setState({
                isLoading: false,
            });
            goUserInfo();
        }

    }

    render() {
        const { isLoading,isSending } = this.state;
        let  virifyView;
        if (timerModel.timer > 0 && isSending) {
            virifyView  =  <Caption
                                styleName="bold"
                                style={{
                                    margin:'auto',
                                    marginRight:25,
                                    color:'#666666',
                                    fontSize: 15,
                                    // backgroundColor: 'white',
                                }}
                            > 剩余<Text style={{color:'#308EFF',marginLeft: 0,}}>{timerModel.timer}</Text>秒</Caption> ;
        } else {
            virifyView  =    <Button
                                styleName="secondary"
                                style={{
                                    width: 120,
                                    // height: 50,
                                    margin: 'auto',
                                    marginRight:10,
                                    backgroundColor: 'white',
                                    borderColor: 'white',
                                }}
                                onPress={() => this.getMassegeCode()}
                            >
                                <Text
                                    style={{
                                        color: '#333333',
                                        fontSize: 15,
                                    }}
                                >
                                    获取验证码
                                </Text>
                            </Button>;
        }

        return (
            <Screen style={styles.container}>
                {this.state.isLoading ?
                    <Screen style={styles.containerSpinner} >
                        <Spinner />
                    </Screen>
                    :
                    <Screen >

                        <Screen style={styles.container2} >
                            <TextInput
                                style={styles.input}
                                placeholder='请输入手机号'
                                autoCapitalize="none"
                                placeholderTextColor='white'
                                onChangeText={val => this.onChangeText('telephone', val)}
                            />
                            <View style={{
                                height: 2,
                                width:'100%',
                                marginTop:0,
                                marginBottom: 0,
                                backgroundColor:'white'
                            }}>
                                <Divider
                                    styleName="line"
                                    style={styles.inputLine}
                                />
                            </View>

                            <View style={styles.virify} >
                                <TextInput
                                    style={styles.code}
                                    placeholder='请输入验证码'
                                    autoCapitalize="none"
                                    placeholderTextColor='white'
                                    onChangeText={val => this.onChangeText('code', val)}
                                />
                                {virifyView}
                            </View>

                            <Button
                                styleName="secondary"
                                style={styles.buttonSign}
                                onPress={() => this.virifyMassegeCode()}
                            >
                                <Text style={styles.buttonText} >下一步</Text>
                            </Button>



                        </Screen>
                    </Screen> }
                <Toast
                    ref="toast"
                    position='top'
                    positionValue={150}
                />
            </Screen>
        )
    }
});

const styles = StyleSheet.create({
    header: {
        height: 45,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    headerOne: {
        // marginTop:45,
        width: '50%',
        height: '100%',
        padding: 'auto',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 17
    },
    headerTextSelected: {
        fontSize: 17,
        color: '#000000'
    },
    headerLine: {
        width: 25,
        height: 4,
        backgroundColor: '#308EFF',
        margin: 'auto',
        marginBottom: 0,
    },
    inputLine:{
        width: '90%',
        height: 1,
        backgroundColor: '#EEEEEE',
        margin: 'auto',
    },
    input: {
        width: '100%',
        // margin: 5,
        // padding: '5%',
        // paddingLeft: '5%',
        // paddingLeft: 10,
        backgroundColor: 'white',
    },
    container: {
        // backgroundColor: 'white',
    },
    containerSpinner:{
        flex: 1,
        marginTop: 200,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    container2: {
        // backgroundColor: 'white',
        flex: 1,
        marginTop: 10,
        alignItems: 'center'
    },
    virify: {
        width: '100%',
        // paddingLeft: '5%',
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    otherSign: {
        width: 300,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    code: {
        width: 180,
        backgroundColor: 'white',
    },
    rightSign: {
        marginRight: 5,
        alignItems: 'flex-end',
    },
    footerSign:{
        margin:'auto',
        marginTop:10,
        alignItems: 'center',
        color: '#999999'
    },
    buttonSign:{
        width: '90%',
        marginTop: 55,
        backgroundColor:'#308EFF',
        borderColor:'#308EFF'
    },
    buttonText:{
        fontSize:18
    }
})