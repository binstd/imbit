
import React from 'react'
import {
    StyleSheet,
    AsyncStorage,
} from 'react-native'

// import { USER_KEY } from '../../config'
import { observer } from 'mobx-react/native';
import UserStore from '../../model/UserStore';
// import Blockies from 'react-native-blockies';
import { authTouchID } from '../../helper/Common';
import {
    Button,
    Screen,
    Row,
    Text,
    Icon,
    ScrollView,
    Spinner,
    View
} from '@shoutem/ui';


// @observer
export default observer( class SettingUserMainScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '个人信息',
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



    toSetttingNewTelephone = async () =>{
        if(await authTouchID('重置手机号')) {
            this.props.navigation.navigate('SetttingNewTelephone');
        }
    }

    render() {
        return (
            <Screen >
                {UserStore.address?
                <ScrollView>
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('SettingEmail');
                        }}
                    >
                        <Row>
                            <Text>邮箱</Text>
                            <Text style={styles.leftRow} > {UserStore.email} </Text>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </Button>

                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('SettingUsername');
                        }}
                    >
                        <Row>
                            <Text >用户名</Text>
                            <Text style={styles.leftRow} >  {UserStore.username}  </Text>
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
                                <Text> 更换手机号 </Text>
                                <Text style={styles.leftRow} > {UserStore.telephone} </Text>
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