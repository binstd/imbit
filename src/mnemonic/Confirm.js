import React, { Fragment } from 'react'
import {
    StyleSheet,
    AsyncStorage
} from 'react-native'

// import { goHome } from '../initNavigation'
import { USER_KEY } from '../config'

// import { Navigation } from 'react-native-navigation';

import { Screen, View, TextInput, Button, Text, Divider } from '@shoutem/ui';

import { observer } from 'mobx-react/native';
import userModel from '../model/userModel';

import { goHome } from '../initNavigation';

import { asyncStorageSave, asyncStorageLoad } from '../helpers/asyncStorage';

import validator from 'validator';
import Toast, {DURATION} from 'react-native-easy-toast';
// @observer
export default observer(class Confirm extends React.Component {
    static get options() {
        return {
            topBar: {
                noBorder: true,
                title: {
                    text: '助记词备份确认'
                },
            }
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            mnemonicList:[],
            startList:[]
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
    static navigatorStyle = {
        topBarElevationShadowEnabled: false
    };

    addMnemonic(Mnemonic){
        let mnemonicList = this.state.mnemonicList;

        const startList = this.state.startList.filter(item => item !== Mnemonic);
        mnemonicList.push(Mnemonic);
        // console.log('添加之后:',mnemonicList);
        this.setState({mnemonicList,startList});
     
    }

    delMnemonic(Mnemonic){
        let startList = this.state.startList;
        //let mnemonicList = this.state.mnemonicList;
        const mnemonicList = this.state.mnemonicList.filter(item => item !== Mnemonic);
        startList.push(Mnemonic);
        this.setState({mnemonicList,startList});

    }

    async componentDidMount() {
        // console.log('userModel.shuffleMnemonic: \n',userModel.shuffleMnemonic)
        console.log("userModel.getAllData.mnemonic:",userModel.getAllData.mnemonic)
        let mnemonic = [];
        mnemonic = Object.values(userModel.mnemonic);
        // let shuffleMnemonic = mnemonic.sort(() => Math.random() - 0.5)
        this.setState({
            startList:mnemonic.sort(() => Math.random() - 0.5)
        });
        
    }

    async verifyMnemonic() {
        let {mnemonicList} = this.state;
        let realMnemonic = userModel.getAllData.mnemonic;

        // console.log('verifyMnemonic-userModel ',Object.values(userModel.getAllData.mnemonic));
        // console.log(Object.values(mnemonicList));
        // console.log(typeof mnemonicList);
        // console.log(typeof userModel.getAllData.mnemonic);
        console.log(Object.values(mnemonicList).join(" "));
        console.log(Object.values(realMnemonic).join(" "));
        if(Object.values(realMnemonic).join(" ") == Object.values(mnemonicList).join(" ")) {
            goHome();
        } else {
            this.refs.toast.show('助记词确认错误，请仔细的把正确的助记词抄写下来')
            // console.log('抱歉,你没有备份');
        }
    }

    render() {
        
        let {mnemonicList, startList} = this.state;
        return (
            <Screen style={styles.container}>
                 <Text styleName="md-gutter multiline"
                        style={{
                            marginTop: 1,
                            marginBottom: 1,
                        }}
                    >
                        请选择正确的助记词,并按顺序点击。
                </Text>
               
                <Divider styleName="line" />
                <View
                    style={{
                        width:'90%',
                        // height:200,
                        minHeight:100,
                        margin:10,
                        marginTop:5,
                        borderWidth:1,
                        borderStyle:'dashed',
                        borderRadius:10,
                        borderColor:'#4F4F4F',
                        flexWrap: 'wrap',
                        padding: 5,
                        flexDirection: 'row'
                    }}
                >
                    {mnemonicList.map((word,i) =>
                            <Button
                                styleName="secondary"
                                style={styles.mnemonic}
                                key={i}
                                onPress={() => {this.delMnemonic(word)}}
                            >
                                <Text>{word}</Text>
                            </Button>
                        )}
                </View>
                    <View
                        style={{
                            width:'90%',
                            // height:100,
                            margin:10,
                            flexWrap: 'wrap',
                            flexDirection: 'row'
                        }}
                    >
                      
                        {startList.map((word, i) => 
                                <Button styleName="secondary"
                                style={styles.mnemonic}
                                key={i}
                                onPress={() => {this.addMnemonic(word)}}
                            >
                                <Text>{word}</Text>
                            </Button>
                        )}
                    </View>
                    {/* <Divider styleName="line" /> */}
                    <View
                        style={{
                                flex: 1,  
                                justifyContent: 'center',
                                marginTop: 50,
                                width:'100%',
                                padding: 'auto',
                                height:100
                            }}
                    >  
                        <Button 
                            styleName="secondary" 
                            style={{
                                width: '90%',
                                backgroundColor:'#308EFF',
                                borderColor:'#308EFF',
                                margin: 'auto',
                                // marginTop: 10,
                            }}
                            onPress={() => {this.verifyMnemonic()}}       
                        >
                            <Text>确认</Text>
                        </Button>
                    </View>
                    <Toast 
                        ref="toast"  
                        position='center'
                        positionValue={5} 
                    /> 
            </Screen>
        )
    }
});

const styles = StyleSheet.create({
    input: {
        width: 30,
        margin: 10,
        padding: 10,
        paddingLeft: 30,
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    mnemonic: {
        color: 'white',
        marginLeft: 10,
        marginTop:5,
        height:40,
    }
})