import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
//   Button,
  StatusBar,
  StyleSheet,
//   View,
//   Text
} from 'react-native';

import {
    ScrollView,
    Icon,
    Row,
    Subtitle,
    Text,
    Button,
    TextInput,
    // Button,
    View,
    Divider,
    Spinner,
    Screen,
    Caption,
    Image,
    TouchableOpacity
} from '@shoutem/ui';

import RNWalletConnect from '@walletconnect/react-native';
import {
    testAccounts,
    sendTransaction,
    signMessage
} from "../helpers/wallet";

import DisplayRequest from "../components/DisplayRequest";

import { goHome } from '../initNavigation';
import { USER_KEY } from '../config'
import { asyncStorageLoad } from '../helpers/asyncStorage';
import { Navigation } from 'react-native-navigation';

export default class ConnectScreen extends React.Component {
    // static navigationOptions = {
    //   title: '链接确认页',
    // };

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
                        id: 'Return',
                        // icon: <Icon name="sidebar" />,
                        text: '退出连接',
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
            uri:"",
            walletConnector: null,
            peerMeta: {
                description: "",
                url: "",
                icons: [],
                name: "",
                ssl: false
            },
            connected: false,
            loading:false,
            chainId: 3,
            // accounts: testAccounts.map(account => account.address),
            address: '',
            requests: [],
            results: [],
            displayRequest: null // 请求类型
        };
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }

    navigationButtonPressed({ buttonId }) {
        // console.log('buttonId => ', buttonId);
        if (buttonId === 'Return') {
            this.killSession();
            goHome();
        }
    }

    async componentDidMount() {
        const user = await asyncStorageLoad(USER_KEY);
        console.log('connect: user: \n',user);
        this.setState({
            address:user.address,
        });
        // this.initWallet();  // 因为localstorage为空，所以这个方法没卵用。
        this.onURIPaste();
    }

   

    //获取 uri 
    onURIPaste = async () => {
        // const data = e.target.value;
        // const uri = typeof data === "string" ? data : "";
        // const { navigation } = this.props;
        // console.log('this.props.uri => \n',this.props.uri);
    
        console.log('扫码后获得URL:',this.props.uri);  // tslint:disable-line
        if (this.props.uri) {
            await this.setState({ 
                uri:this.props.uri 
            });
            await this.initWalletConnect();
        }
    };

    // 初始化
    initWalletConnect = async () => {
        const { uri } = this.state;

        this.setState({ loading: true });

        try {
            const walletConnector = new RNWalletConnect(
                { uri },
                {
                    clientMeta: {                                                       // Required
                        description: "WalletConnect Developer App",
                        url: "https://walletconnect.org",
                        icons: ["https://walletconnect.org/walletconnect-logo.png"],
                        name: "WalletConnect",
                        ssl: true
                    }
                }
            );
            console.log('到这儿!');    
            // window.walletConnector = walletConnector;  // tslint:disable-line

            if (!walletConnector.connected) {
                
                await walletConnector.createSession();
            }
            
            await this.setState({
                loading: false,
                walletConnector,
                uri: walletConnector.uri
            });

            this.subscribeToEvents();
        } catch (error) {
            this.setState({ loading: false });

            throw error;
        }
    };
    openRequest = (request) =>{
        this.setState({ displayRequest: request });
    }
       

    // 监听
    subscribeToEvents = () => {
        const { walletConnector } = this.state;

        if (walletConnector) {
            // 扫描成功
            walletConnector.on("session_request", (error, payload) => {
                console.log('walletConnector.on("session_request")'); // tslint:disable-line
                console.log('扫码后:', payload);  // tslint:disable-line
                if (error) {
                    throw error;
                }

                const { peerMeta } = payload.params[0];
                this.setState({ peerMeta });
                // this.approveSession();
            });

       
            walletConnector.on("session_update", (error, payload) => {
                console.log('walletConnector.on("session_update")'); // tslint:disable-line

                if (error) {
                    throw error;
                }
            });

            
            walletConnector.on("call_request", (error, payload) => {
                console.log('walletConnector.on("call_request")'); // tslint:disable-line
                console.log('获取到请求, payload:', payload); // tslint:disable-line
                if (error) {
                    throw error;
                }

                const requests = [...this.state.requests, payload];
                this.setState({ requests });
            });

            // 确认连接
            walletConnector.on("connect", (error, payload) => {
                console.log('walletConnector.on("connect")'); // tslint:disable-line
                console.log('确认连接');  // tslint:disable-line
                if (error) {
                    throw error;
                }

                this.setState({ connected: true });
            });

            walletConnector.on("disconnect", (error, payload) => {
                console.log('退出连接!")'); // tslint:disable-line

                if (error) {
                    throw error;
                }

                // this.resetApp();
            });

            if (walletConnector.connected) {
                const { chainId, accounts } = walletConnector;
                const address = accounts[0];
                // updateWallet(address, chainId);
                this.setState({
                    connected: true,
                    address,
                    chainId
                });
            }

            this.setState({ walletConnector });
        }
    };


    // 弹出层中,确认连接    
    approveSession = () => {
        const { walletConnector, chainId, address } = this.state;
        console.log(walletConnector, chainId, address);  // tslint:disable-line
        if (walletConnector) {
            walletConnector.approveSession({ chainId, accounts: [address] });
        }
        this.setState({ walletConnector });
    };

     // 弹出层中,拒接连接    
    rejectSession = () => {
        const { walletConnector } = this.state;
        if (walletConnector) {
            walletConnector.rejectSession();
        }
        this.setState({ walletConnector });
    };

    // 退出连接
    killSession = () => {
        const { walletConnector } = this.state;
        if (walletConnector) {
            walletConnector.killSession();
        }
        // this.resetApp();
    };

    openRequest = (request ) =>
        this.setState({ displayRequest: request });

    closeRequest = async () => {
        const { requests, displayRequest } = this.state;
        const filteredRequests = requests.filter(
            request => request.id !== displayRequest.id
        );
        await this.setState({
            requests: filteredRequests,
            displayRequest: null
        });
    };

    //执行交易
    approveRequest = async () => {
        const { walletConnector, displayRequest, address } = this.state;

        try {
            let result = null;

            if (walletConnector) {
                console.log("displayRequest.method:\n",displayRequest.method);
                switch (displayRequest.method) {
                    case "eth_sendTransaction":
                        result = await sendTransaction(displayRequest.params[0]);
                    case "personal_sign":
                    case "eth_sign":
                        if (address === displayRequest.params[0]) {
                            result = await signMessage(displayRequest.params[1]);
                        }
                    default:
                        break;
                }

                if (result) {
                    walletConnector.approveRequest({
                        id: displayRequest.id,
                        result
                    });
                } else {
                    walletConnector.rejectRequest({
                        id: displayRequest.id,
                        error: { message: "JSON RPC method not supported" }
                    });
                }
            }
        } catch (error) {
            console.error(error); // tslint:disable-line
            if (walletConnector) {
                walletConnector.rejectRequest({
                    id: displayRequest.id,
                    error: { message: "Failed or Rejected Request" }
                });
            }
        }

        this.closeRequest();
        await this.setState({ walletConnector });
    };

    rejectRequest = async () => {
        const { walletConnector, displayRequest } = this.state;
        if (walletConnector) {
            walletConnector.rejectRequest({
                id: displayRequest.id,
                error: { message: "Failed or Rejected Request" }
            });
        }
        await this.closeRequest();
        await this.setState({ walletConnector });
    };


    render() {
     const { navigation } = this.props;
     const {
        peerMeta,
        connected,
        // scanner,
        // accounts,
        // address,
        // chainId,
        requests,
        displayRequest
    } = this.state;
   
      return (
        <View style={styles.container}> 
          {
            !connected ? (
                peerMeta && peerMeta.name ? (
                    <View style={styles.containerwork} >
                            <Text style={{width:'90%',margin:'auto', marginTop:20, marginBottom:20,}} > 
                                您是否同意连接 ?
                            </Text>
                            <View styleName="horizontal" >
                                <Button 
                                    styleName="confirmation secondary"
                                    style={styles.approve}
                                    onPress={this.approveSession}  
                                >
                                    <Text>同意</Text>
                                </Button>
                
                                <Button 
                                    styleName="confirmation"
                                    style={styles.reject}
                                    onPress={this.rejectSession}
                                >
                                    <Text>拒接</Text>
                                </Button>
                            </View>
                    </View>
                ):(
                    <View 
                        style={styles.container2} 
                    >   
                       
                        <View
                            style={styles.requestone}
                        >
                            <Spinner />
                        </View>

                    </View>
                )
            )
            :
            !displayRequest ? (  //不显示请求
                <View  style={styles.container2} >
                    {!!requests.length ? (
                        requests.map(request => (
                            <View
                                style={styles.requestone}
                                key={request.id}
                            >
                                <Button 
                                    styleName="full-width"
                                    onPress={() => this.openRequest(request)}
                                >
                                    <Text>{request.method}</Text>
                                </Button>
                            </View>
                        ))
                    ) : (
                            // <View style={styles.container2} >
                                <Text>{" "}</Text>
                            // </View>
                        )}
                </View>
            ) : (   //评论器
                        <DisplayRequest
                            displayRequest={displayRequest}
                            peerMeta={peerMeta}
                            approveRequest={this.approveRequest}
                            rejectRequest={this.rejectRequest}
                    />
                )
            }
     
          {/* <StatusBar barStyle="default" /> */}
        </View>
      );
    }
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3f3f3', //'#f3f3f3'
        height:'100%'
   
    },
    container2:{
        marginTop: 100,
        padding: 5,
        height:300,
        backgroundColor:'#f3f3f3',
    },

    requestone:{
        marginTop:5,
        margin:10,
        // height:'30%'
        height:60,
    },

    containerwork:{
        marginTop: 100,
        backgroundColor: '#f3f3f3',
        height:200,
        width: '100%',
    },
    approve:{
        width:'30%',
        backgroundColor:'#308EFF',
        borderColor: '#308EFF',
    },
    reject:{
        width:'30%',
        color:'#308EFF',
        borderColor: '#308EFF',
    }

  });

 