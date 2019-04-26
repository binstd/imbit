import React from 'react'

import {
    Clipboard,
    Alert,
    StyleSheet,
    AsyncStorage
} from 'react-native'



import { observer } from 'mobx-react/native';

import userStore from '../model/UserStore';
import Toast, { DURATION } from 'react-native-easy-toast';
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
import TouchID from 'react-native-touch-id';
import {loadAddress,loadPrivateKey} from '../helper/Wallet';

@observer
export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'ImBit',
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
            headerLeft: (
                <Button 
            
                >
                    <Text style={{color:'#999999'}}></Text>
                </Button>
            ),
            headerRight: (
                <Button 
                    onPress={() => { navigation.navigate('Setting')}}
                >
                    <Text style={{color:'#999999'}}>设置</Text>
                </Button>
            ),
        }
    };
    

    constructor(props) {
        super(props);
        this.state = {
            address:'0sssfd',
            username:'',
            telephone:'',
            loading: false,
            hasPrivateKey:true,
        };
    }



    async UNSAFE_componentWillMount() {
        
        // const user = await asyncStorageLoad(USER_KEY);
        // userStore.allSet(user);
        // console.log('user',user);
        // this.setState({
        //     address:user.address,
        //     username:user.username,
        //     telephone:user.telephone
        // });
    }
    
    async componentDidMount() {
        console.log(userStore.getAllData);
        let privateKey  = await loadPrivateKey();
        this.setState({
            hasPrivateKey:privateKey?true:false,
        })
        
    }

    copyAddress = async () => {
        Clipboard.setString(userStore.address);
        let str = await Clipboard.getString();
        Alert.alert('','已复制',
            [{text:"好的", onPress:this.confirm}]
        );
    }

    toTransaction = async () => {
        // if(!userStore.privateKey) {
        //     this.refs.toast.show('请先绑定区块链身份!');
        //     Navigation.push(this.props.componentId, {
        //         component: {
        //             name: 'BindingMnemonic',
        //         }
        //     });
        //     return ;
        // }
        // if(await authTouchID('转账')) {
        //     Navigation.push(this.props.componentId, {
        //         component: {
        //             name: 'ChooseSymbol',
        //         }
        //     });
        // }
    }

    render() {
        const {hasPrivateKey} = this.state;
        const {address, username, telephone}  = userStore.getAllData;
        let showaddress  = address ? address.slice(0,15 ): '';
   
        return (
            <Screen >
            {   address ?
                <Screen >                
                    <View style={styles.usercard} >
                        <TouchableOpacity 
                            onPress={() => {
                                this.props.navigation.navigate('UserInfo');
                            }}
                        >
                            <Row styleName="small"  
                                style={styles.userinfo} 
                            >
                                <Blockies
                                    blockies={address} 
                                    size={60} 
                                    style={{ width: 60, height: 60, marginRight: 20, }} 
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
                                onPress={this.copyAddress}
                                name="right-arrow"
                            >
                                <Text style={{color:'#999999'}}>复制</Text>
                            </Button>
                        </Row>
                            {
                                !hasPrivateKey &&
                                <TouchableOpacity
                                style={styles.bindingMnemonic}
                                onPress={() => {
                                    Navigation.push(this.props.componentId, {
                                        component: {
                                            name: 'BindingMnemonic',
                                        }
                                    });
                                }}
                            >
                                <Text
                                    style={{ color: '#308EFF', fontSize: 16,}}
                                >
                                    绑定区块链身份
                                </Text>
                            </TouchableOpacity>
                            }
                            
                    </View>
                    <View 
                        style={{
                            width:'100%',
                            marginTop:0,
                            height:50,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }} 
                    >
                        <Button 

                            style={{
                                width:85,
                                height:40,
                                margin:5,
                            }} 

                            onPress={() => {
                                this.toTransaction();
                            }} 
                        >
                            <Text>转账</Text>
                        </Button>
                        <Button 
                            style={{
                                width:85,
                                height:40,
                                margin:5,
                            }} 
                            onPress={() => {
                                this.props.navigation.navigate('MyMoney');
                            }}
                        >
                            <Text>我的资产</Text>
                        </Button> 
                        <Button 
                            style={{
                                width:85,
                                height:40,
                                margin:5,
                            }} 
                            onPress={() => {
                                this.props.navigation.navigate('TwoFactorList');
                            }}
                        >
                            <Text>双层验证</Text>
                        </Button> 
                    </View>

                    <View style={styles.scancontainer}>
                        <TouchableOpacity 
                            style={{ alignItems: 'center'}}
                            onPress={() => {
                                this.props.navigation.navigate('QRCodeScanner');
                            }}
                            >
                            <Image
                                styleName="medium-square"
                                style={styles.scanicon} 
                                source={{ uri: 'https://blockluz-1253389096.cos.ap-beijing.myqcloud.com/blockman/scanicon3-1.png'}}
                            />
                            <Text style={styles.scantext}> 扫一扫 </Text>
                        </TouchableOpacity>  

                        <Caption
                            styleName="bold"
                            style={styles.footertext}
                        >
                            安全、便捷的区块链身份授权系统
                        </Caption>
                    </View>
                    <Toast
                        ref="toast"
                        position='top'
                        positionValue={150}
                    />
                </Screen>
                :
                <Spinner />
                }
            </Screen>
            
        )
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('Other');
    };

    _signOutAsync = async () => {
        // await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
    
    _mymoney = () => {
        this.props.navigation.navigate('TwoFactorList');
    };
}

const styles = StyleSheet.create({
    container: {
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
        height:170,
        width:'100%',
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
        marginTop:'55%',
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
        marginTop: 10,
        color: '#999999'
    },
    footer:{
        margin:'auto',
        marginTop:5,
    },
    bindingMnemonic:{
        alignItems: 'center',
        height:30,
        padding:'auto',
        color: '#308EFF',
    
    }
})