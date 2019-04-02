import React from 'react'
import {
    Clipboard,
    Alert,
    StyleSheet,
    AsyncStorage
} from 'react-native'

import { Navigation } from 'react-native-navigation';

import { USER_KEY } from '../config'
import { observer } from 'mobx-react/native';
import userModel from '../model/userModel';
import { asyncStorageLoad } from '../helpers/asyncStorage';

import {
    Icon,
    Row,
    Subtitle,
    Text,
    Button,
    View,
    Divider,
    Spinner,
    Screen,
    Caption,
    Image,
    TouchableOpacity
} from '@shoutem/ui';

import Blockies from 'react-native-blockies';

export default observer( class Home extends React.Component {

    static options(passProps) {
        return {
            topBar: {
                color: 'red',
                title: {
                    text: 'ImBit',
                    alignment: "center"
                },
                elevation: 0,
                navBarNoBorder: true,
                hideShadow: true,
                noBorder: true,
                rightButtons: [
                    {
                        id: 'Setting',
                        // icon: <Icon name="sidebar" />,
                        text: '设置',
                        color: '#4F4F4F',

                    }
                ],
                leftButtons: [],
            }
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            address:'',
            username:'',
            telephone:'',
            loading: false
        };
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId === 'Setting') {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'Setting',
                }
            });
        }
    }

    logout = async () => {
        try {
            await AsyncStorage.removeItem(USER_KEY)
            goToAuth()
        } catch (err) {
            console.log('error signing out...: ', err)
        }
    }

    async UNSAFE_componentWillMount() {
        const user = await asyncStorageLoad(USER_KEY);
            if(userModel.openTouchId){
                console.log('请使用touchid！');
            }
            console.log('user',user);
            this.setState({
                address:user.address,
                username:user.username,
                telephone:user.telephone
            });
        
    }

    copyAddress = async () => {
        console.log(this.state.address);
        Clipboard.setString(this.state.address);
        let str = await Clipboard.getString();
        // alert('复制成功！');
        Alert.alert('','已复制',
            [{text:"好的", onPress:this.confirm}]
        );
    }

    render() {
        console.log('props; ', this.props)
        const {address, username, telephone} = this.state;
        
        let showaddress  = address ? address.slice(0,15 ): '';
   
        return (
            <Screen >
            {   address ?
                <Screen >                
                    <View style={styles.usercard} >
                        <TouchableOpacity 
                            onPress={() => {
                                Navigation.push(this.props.componentId, {
                                    component: {
                                        name: 'UserInfo',
                                    }
                                });
                            }}
                        >
                            <Row styleName="small"  
                                style={styles.userinfo} 
                            >
                                <Blockies
                                    blockies={address} //string content to generate icon
                                    size={60} // blocky icon size
                                    style={{ width: 60, height: 60, marginRight: 20, }} // style of the view will wrap the icon
                                    color="#dfe" 
                                    bgColor="#ffe" 
                                    spotColor="#abc"   
                                />
                                <View 
                                    styleName="vertical"
                                >
                                    <Subtitle>{username}</Subtitle>
                                    <Text numberOfLines={1}>{telephone}</Text>
                                </View>
                                <Icon styleName="disclosure" name="right-arrow" />
                            </Row>
                        </TouchableOpacity>
                        <Divider
                            styleName="line"
                            style={styles.inputLine}
                        />
                        <Row styleName="small" 
                            style={{
                                width:'95%',
                                height:30,
                            }} 
                        >
                            <View styleName="horizontal">
                                <Subtitle styleName="md-gutter-right">地址:</Subtitle>
                                <Caption >{showaddress}......</Caption>
                            </View>
                            <Button 
                                // styleName="secondary" 
                                onPress={this.copyAddress}
                                name="right-arrow"
                            >
                                <Text style={{color:'#999999'}}>复制</Text>
                            </Button>
                        </Row>
                    </View>
                    <View 
                        style={{
                            width:'100%',
                            height:80,
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }} 
                    >
                        <Button 
                            style={{
                                width:85,
                                height:40,
                                margin:10,
                            }} 
                            
                            onPress={() => {
                                Navigation.push(this.props.componentId, {
                                    component: {
                                        name: 'ChooseSymbol',
                                    }
                                });
                            }}
                            
                        >
                            <Text>转账</Text>
                        </Button>
                        <Button 
                            // styleName="secondary" 
                            style={{
                                width:85,
                                height:40,
                                margin:10,
                            }} 
                            // onPress={this._mymoney}  
                            onPress={() => {
                                Navigation.push(this.props.componentId, {
                                    component: {
                                        name: 'MyMoneyScreen',
                                    }
                                });
                            }}
                        >
                            <Text>我的资产</Text>
                        </Button> 
                    </View>

                    <View style={styles.scancontainer}>
                        <TouchableOpacity 
                            style={{ alignItems: 'center'}}
                            onPress={() => {
                                Navigation.push(this.props.componentId, {
                                    component: {
                                        name: 'QRCodeScannerScreen',
                                    }
                                });
                            }}
                            >
                            <Image
                                styleName="medium-square"
                                style={styles.scanicon} 
                                source={{ uri: 'https://blockluz-1253389096.cos.ap-beijing.myqcloud.com/blockman/scanicon3-1.png'}}
                            />
                            <Text style={styles.scantext}>扫一扫</Text>
                        </TouchableOpacity>  

                        <Caption
                            styleName="bold"
                            style={styles.footertext}
                        >
                            安全、便捷的区块链身份授权系统
                        </Caption>
                    </View>
                </Screen>
                :
                <Spinner />
                }
            </Screen>
            
        )
    }
});

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
    },
    container2: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center'
    },
    usercard:{
        marginTop:10,
        backgroundColor: 'white',
        height:140,
        width:'100%',
        // alignItems: 'center',
        // flex: 1,
    },
    inputLine:{
        width: '90%',
        height: 1,
        backgroundColor: '#EEEEEE',
        margin: 'auto',
        paddingLeft: 5,
        marginBottom: 0,
    },
    userinfo:{
        height:90,
    },
    scancontainer:{
        marginTop:'80%',
        height: '100%',
        padding: 'auto',
        alignItems: 'center',   
    },
    scanicon:{
        width:90,
        height:90,
    },
    scantext:{
        fontSize: 13,
        color: '#000000'
    },
 
    footertext: {
        alignItems: 'center',
        height:20,
        marginTop: 25,
        color: '#999999'
    },
    footer:{
        margin:'auto',
        marginTop:5,
    },
})