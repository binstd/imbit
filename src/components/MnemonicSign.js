import * as React from "react";
import { StyleSheet,AsyncStorage } from 'react-native';

import {
    Text,
    Button,
    View,
    Screen,
    TextInput,
    Caption
} from '@shoutem/ui';


import { hasAddress } from '../helper/UserFetch';
// import validator from 'validator';
import Toast, { DURATION } from 'react-native-easy-toast';
import UserStore from '../model/UserStore';
import { observer } from 'mobx-react/native';
import {walletInit} from '../helper/Wallet';


@observer
class MnemonicSign extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            mnemonic:'',
        };
    }

    componentDidMount() {

    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }

     signIn =() => {
        let { mnemonic } = this.state;
        let mnemonicList = mnemonic.split(" ");
        console.log(mnemonicList.length);
        if (mnemonicList.length != 12) {
            this.refs.toast.show('助记词仅支持用空格隔开的12个单词!');
            return;
        } else {
            this.props.setLoading(true);
            setTimeout( () => {
                this.saveWallet(mnemonic);
            }, 500);
        }
    }
    //marine egg thunder risk method absorb kitchen bird assist legend clarify approve
     saveWallet = async (mnemonic) => {
        let { walletAddress } = await walletInit(mnemonic);
        if (!walletAddress) {
            this.props.setLoading(false);
        }
        let userdata = await hasAddress(walletAddress);

        if (userdata) {
            userdata['hasPrivate'] = true;
            await UserStore.login(userdata);
            await this.props.navigation.navigate('Home');
        } else {
            this.props.setLoading(false);
            console.log('新助记词！');
            this.refs.toast.show('暂不支持外部助记词导入!');
            //设置手机号页面
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
        padding: 10,
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


