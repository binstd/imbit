import * as React from "react";
import {
    AsyncStorage,
    StyleSheet,
} from 'react-native';

import {
    ScrollView,
    Row,
    Subtitle,
    Text,
    Button,
    View,
    Screen,
    TextInput,
    Caption
} from '@shoutem/ui';

import userModel from '../model/userModel';
import { loadWallet } from '../helpers/wallet';
import { hasAddress } from '../helpers/userFetch';
import validator from 'validator';
import Toast, { DURATION } from 'react-native-easy-toast';
import { USER_KEY } from '../config';
import { Navigation } from 'react-native-navigation';
import { goHome } from '../initNavigation'
class MnemonicSign extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            mnemonic:'',
        };
    }
    
  
    componentDidMount() {
        // this.setState({
        //     address:,
        // });
       
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }

    async signIn() {
        let { mnemonic } = this.state;
        let mnemonicList = mnemonic.split(" ");
        console.log(mnemonicList.length);
        if (mnemonicList.length != 12) {
            this.refs.toast.show('助记词仅支持用空格隔开的12个单词!');
            return;
        } else {
            this.props.setLoading(true);
            // this.setState({ isLoading: true });
            setTimeout(() => {
                this.saveWallet(mnemonic);
            }, 500);
        }
    }

    async saveWallet(mnemonic) {
        userModel.clearAll();
        let wallet = await loadWallet(mnemonic);
        if (!wallet) {
            
            this.props.setLoading(false);
            this.refs.toast.show('无法创建区块链身份,请检测助记词是否正确!');
        }
        let result = await hasAddress(wallet.address);
        if (result == 1) {
            this.props.setLoading(false);
            goHome();
        } else {
            // console.log('SettingTelephone!');
            this.props.setLoading(false);
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'SettingTelephone',
                }
            })

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
                onPress={() => this.signIn()}
            >
                <Text style={styles.buttonText}>登录</Text>
            </Button>

            <View style={styles.otherSign} >
                <Caption
                    styleName="bold"
                    style={styles.footerSign}
                >
                    首次登录会自动创建新账户
                </Caption>
            </View>
            <Toast
                    ref="toast"
                    position='top'
                    positionValue={150}
                />
        </Screen>
    );
  }
}

export default MnemonicSign;

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
        padding: 50,
        alignItems: 'center',
        // textAlign: 'center',
    },
    otherSign: {
        width: 300,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    rightSign: {
        // justifyContent: '',
        marginRight: 5,
        alignItems: 'flex-end',
    },
    footerSign: {
        margin: 'auto',
        marginTop: 10,
        alignItems: 'center',
        color: '#999999'
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


