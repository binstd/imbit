import * as React from "react";
import {
    AsyncStorage,
    StyleSheet,
} from 'react-native';

import {
    Text,
    Button,
    View,
    Screen,
    TextInput,
    Caption,
    Spinner
} from '@shoutem/ui';


import UserStore from '../model/UserStore';
import { walletInit } from '../helper/Wallet';
import { hasAddress } from '../helper/UserFetch';

import Toast, { DURATION } from 'react-native-easy-toast';


class BindingMnemonicScreen extends React.Component {
   
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '绑定区块链身份',
            headerStyle:{
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
            headerRight: (<View></View>)
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            mnemonic: '',
            isLoading: false,
        };
    }

    componentDidMount() {
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }

    async settingMnemonic () {
        let { mnemonic } = this.state;
        let mnemonicList = mnemonic.split(" ");
        console.log(mnemonicList.length);
        if (mnemonicList.length != 12) {
            this.refs.toast.show('助记词仅支持用空格隔开的12个单词!', 2000);
            return;
        } else {
            this.setState({ isLoading: true });
            setTimeout(() => {
                this.saveWallet(mnemonic);
            }, 500);
        }
    }

    async saveWallet(mnemonic) {
        let { walletAddress } = await walletInit(mnemonic);
   
        if (!walletAddress) {
            this.setState({ isLoading: false });
            this.refs.toast.show( '无法创建区块链身份,请检测助记词是否正确!', 2000 );
            return;
        } else {
            console.log(walletAddress,':walletAddress');
            let userInfo = await hasAddress(walletAddress);
            userInfo.hasPrivate = true;
            console.log('UserStore.login(userInfo)', userInfo);
            await UserStore.login(userInfo);
            this.setState({ isLoading: false});
        // goHome();
            this.props.navigation.navigate('Home');
        }
        
    }

    render() {
        const {
            displayRequest,
            peerMeta,
            approveRequest,
            rejectRequest
        } = this.props;

        return (
            <Screen style={styles.container}  >
                {this.state.isLoading ?
                    <Screen style={styles.container2} >
                        <Spinner />
                    </Screen>
                    :
                    <Screen style={styles.container2} >
                        <TextInput
                            style={styles.input}
                            placeholder='请输入12个助记词,词词之间用空格'
                            autoCapitalize="none"
                            autoCorrect={false}
                            multiline={true}
                            placeholderTextColor='white'
                            onChangeText={val => this.onChangeText('mnemonic', val)}
                        />

                        <Button
                            styleName="secondary"
                            style={styles.buttonSign}
                            onPress={() => this.settingMnemonic ()}
                        >
                            <Text style={styles.buttonText}>确认</Text>
                        </Button>

                        <View style={styles.otherSign} >
                            <Caption
                                styleName="bold"
                                style={styles.footerSign}
                                onPress={() => this.props.navigation.navigate('Home')}
                            >
                            暂不绑定
                            </Caption>
                        </View>
                        <Toast
                            ref="toast"
                            position='top'
                            positionValue={150}
                        />
                    </Screen>
                }
            </Screen>
        );
    }
}

export default BindingMnemonicScreen;

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: 120,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
    },
    otherSign: {
        width: 300,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    rightSign: {
        marginRight: 5,
        alignItems: 'flex-end',
    },
    footerSign: {
        margin: 'auto',
        marginTop: 10,
        alignItems: 'center',
        fontSize: 14,
    },
    buttonSign: {
        width: '90%',
        marginTop: 55,
        backgroundColor: '#308EFF',
        borderColor: '#308EFF',
    },
    buttonText: {
        fontSize: 18,
    }

});


