import React from 'react'

import {
    Clipboard,
    Alert,
    StyleSheet,
    AsyncStorage
} from 'react-native'



import { observer } from 'mobx-react/native';

import UserStore from '../model/UserStore';
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
import {authTouchID} from '../helper/Common';
import {loadAddress,loadPrivateKey} from '../helper/Wallet';

@observer
export default class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'ImBit',
            headerStyle:{
                // borderBottomWidth:0,
                elevation:0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
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
            loading: true,
            hasPrivateKey:true,
        };
    }



    async UNSAFE_componentWillMount() {
        
        // const user = await asyncStorageLoad(USER_KEY);
        // UserStore.allSet(user);
        // console.log('user',user);
        // this.setState({
        //     address:user.address,
        //     username:user.username,
        //     telephone:user.telephone
        // });
    }
    
    async componentDidMount() {
        // console.log(UserStore.getAllData);
        // let privateKey  = await loadPrivateKey();
        // this.setState({
        //     hasPrivateKey:privateKey?true:false,
        //     loading:privateKey?false:true
        // }); 
    }

    copyAddress = async () => {
        Clipboard.setString(UserStore.address);
        let str = await Clipboard.getString();
        Alert.alert('','已复制',
            [{text:"好的", onPress:this.confirm}]
        );
    }

    toTransaction = async () => {
        const userNetwork = UserStore.network.split("-");
        let balance = await fetch(`https://blockscout.com/${userNetwork[0]}/${userNetwork[1]}/api?module=account&action=balance&address=${UserStore.address}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'get'
        }).then(response => response.json());

        if(balance.result ===  '0') {
            this.refs.toast.show('没有足够的ETH,支付转账费!');
            return ;
        }

        if(await authTouchID('转账')) {
            this.props.navigation.navigate('ChooseSymbol');
        }
    }

    toMymoney = async () => {
        const userNetwork = UserStore.network.split("-");
        let balance = await fetch(`https://blockscout.com/${userNetwork[0]}/${userNetwork[1]}/api?module=account&action=balance&address=${UserStore.address}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'get'
        }).then(response => response.json());

        if(balance.result ===  '0') {
            this.refs.toast.show('您在当前区块链网络没有任何资产!');
            return ;
        }
        this.props.navigation.navigate('MyMoney');
    }

    render() {
        const {address, username, telephone,hasPrivate}  = UserStore.getAllData;
        let showaddress  = address ? address.slice(0,15 ): '';
   
        return (
            <Screen >
            {   hasPrivate?
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
                                !hasPrivate &&
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
                                this.toMymoney();
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