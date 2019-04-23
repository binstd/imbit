
import React from 'react'
import {
    StyleSheet,
    AsyncStorage,
} from 'react-native'

// import { USER_KEY } from '../../config'
import { observer } from 'mobx-react/native';
import UserStore from '../../model/UserStore';
// import Blockies from 'react-native-blockies';
// import { authTouchID } from '../../helpers/asyncStorage';
import {
    Button,
    Screen,
    Row,
    Text,
    Icon,
    ScrollView,
    Spinner
} from '@shoutem/ui';


// @observer
export default observer( class SettingUserMainScreen extends React.Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '个人信息',
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

    logout = async () => {
        await AsyncStorage.removeItem(USER_KEY);
        UserStore.logout();
    }

    toSetttingNewTelephone = async () =>{
        // if(await authTouchID('重置手机号')) {
        //     Navigation.push(this.props.componentId, {
        //         component: {
        //             name: 'SetttingNewTelephone',
        //         }
        //     });
        // }
    }

    render() {
        const { address,email,username, telephone } = UserStore.userInfo;
        console.log(UserStore.userInfo);
        return (
            <Screen >
                {address?
                <ScrollView>
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('SettingEmail');
                        }}
                    >
                        <Row>
                            <Text>邮箱</Text>
                            <Text style={styles.leftRow} > {email} </Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>

                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('SettingUsername');
                            // Navigation.push(this.props.componentId, {
                            //     component: {
                            //         name: 'SettingUserInfo',
                            //     }
                            // });
                        }}
                    >
                        <Row>
                            <Text >用户名</Text>
                            <Text style={styles.leftRow} >  {username}  </Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>

                    {
                        true &&
                        <Button
                            onPress={() => {
                                this.toSetttingNewTelephone();
                            }}
                        >
                            <Row>
                                {/* <Icon name="folder" /> */}
                                <Text> 更换手机号 </Text>
                                <Text style={styles.leftRow} > {telephone} </Text>
                                <Icon styleName="disclosure" name="right-arrow" />
                            </Row>
                        </Button>
                    }

                </ScrollView>
                :
                    <Spinner />
                }
            </Screen>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftRow:{
      color:'#000000',
      fontSize: 14,
    }
})