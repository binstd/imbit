import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import { goToAuth, goHome, goUserInfo,settingTelephone } from './initNavigation'

import { USER_KEY } from './config'
import { asyncStorageLoad, asyncStorageSave } from './helpers/asyncStorage';
import { observer } from 'mobx-react/native';
import userModel from './model/userModel';
import { Navigation } from 'react-native-navigation';
import Reactotron from 'reactotron-react-native';
import {
    Image
} from '@shoutem/ui';
// import ic_launcher from './img/ic_launcher.png';
import { hasAddress } from './helpers/userFetch';
// @observer
export default observer(class Initialising extends React.Component {

    //判断登录
    static navigatorStyle = {
        topBarElevationShadowEnabled: false
    }

    async componentDidMount() {
        Reactotron.log('hello rendering world');
        try {
            const user = await asyncStorageLoad(USER_KEY);
            console.log("init:",user);
            if (user) {
                if (await hasAddress(user.address)) {
                    userModel.allSet(user);
                    goHome();
                } else {
             
                    // console.log('liuliang:',Boolean(user.telephone),user.telephone);
                    // !tmp && typeof(tmp)!="undefined" && tmp!=0
                    if (!user.telephone || typeof(user.telephone) != "undefined" ) {
                        console.log('没有手机号');
                        settingTelephone();
                    } else if (!user.username || typeof(user.username) != "undefined") {
                        goUserInfo();
                    }
                }
            } else {
                // await asyncStorageSave(USER_KEY, {});
                goToAuth()
            }
        } catch (err) {
            console.log('error: ', err)
            goToAuth()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Text style={styles.welcome}>IMbit</Text> */}
                <Image
                    styleName="small"
                    // source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png'}}
                    source={require('./img/ic_launcher.png')}
                />
            </View>
        )
    }
});

const styles = StyleSheet.create({
    welcome: {
        fontSize: 28
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
