import React, { Fragment } from 'react'
import {
  StyleSheet,
  AsyncStorage
} from 'react-native'

import { goHome } from '../initNavigation'
import { USER_KEY } from '../config'

import { Navigation } from 'react-native-navigation';

import { observer } from 'mobx-react/native';
import userModel from '../model/userModel';

import { Screen, View,TextInput,Button,Text,Divider } from '@shoutem/ui';

// @observer
export default observer(class Backup extends React.Component {
    static get options() {
        return {
            topBar: {
                noBorder: true,
                title: {
                    text: '备份'
                },
            }
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            mnemonic:'',
            username:'',
            password:'',
		};
    }  

    state = {
        username: '', password: ''
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }


  signIn = async () => {
    const { username, password } = this.state
    try {
       // login with provider
       const user = await AsyncStorage.setItem(USER_KEY, username)
       console.log('user successfully signed in!', user)
       goHome()
    } catch (err) {
      console.log('error:', err)
    }
  }
 
  async componentDidMount() {
    let mnemonic =  userModel.mnemonic;
    console.log('备份:',mnemonic);
    this.setState({
        mnemonic:mnemonic.join(" ") 
    });
  }

  render() {
    return (
      <Screen style={styles.container} >
                    <Screen styleName="paper"
                    style={{
                        flex: 1,
                        marginTop: 30,
                        height: 80,
                    }}
                >
                    <Text styleName="md-gutter multiline"
                        style={{
                            marginTop: 1,
                            marginBottom: 1,
                        }}
                    >
                        请确认您的周围无人，确保周围没有摄像头的环境下备份。
                    </Text>
                    <Text styleName="md-gutter multiline"
                        style={{
                            marginTop: 1,
                            marginBottom: 1,
                        }}
                    >
                        因为如果他人获取您的助记词，将会对您的身份下的全部数据和资产造成损害。
                    </Text>
                    <Text styleName="md-gutter multiline"
                        style={{
                            marginTop: 1,
                            marginBottom: 1,
                        }}
                    >
                        请抄下助记词，并存在在安全的地方。
                    </Text>
                </Screen>
                {/* <Divider styleName="line" /> */}
                <View
                    style={{
                        width:'90%',
                        height:150,
                        margin:10,
                        marginTop:20,
                        borderWidth:1,
                        borderStyle:'dashed',
                        borderRadius:10,
                        borderColor:'#4F4F4F',
                        flexWrap: 'wrap',
                        padding: 10,
                        flexDirection: 'row'
                    }}
                >
                        <Text style={styles.mnemonic} >
                            {/* 换 促 贮 显 即 背 寺 何 滨 霉 没 酶 */}
                            {this.state.mnemonic}
                        </Text>
                      
                </View>
                     
            {/* <Divider styleName="line" /> */}
            <View
                style={{
                        flex: 1,  
                        justifyContent: 'center',
                        marginBottom: 100,
                        width:'100%',
                        padding: 'auto',
                    }}
            >  
                <Button 
                    styleName="secondary" 
                    style={{
                        width: '90%',
                        marginTop: 50,
                        margin: 'auto',
                        backgroundColor:'#308EFF',
                        borderColor:'#308EFF'
                    }}
                    onPress={() => {
                        Navigation.push(this.props.componentId, {
                            component: {
                                name: 'MnemonicConfirm',
                            }
                        });
                    }}
                >
                    <Text>已做安全备份</Text>
                </Button>
            </View>
      </Screen>
    )
  }
});

const styles = StyleSheet.create({
  input: {
    width: 300,
    margin: 10,
    padding: 10,
    paddingLeft: 30,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mnemonic: {
    color: 'red',
    marginLeft: 10,
    marginTop:5
  }
})