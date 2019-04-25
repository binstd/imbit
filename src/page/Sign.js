import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
} from 'react-native';

import { Screen, Text, Spinner, View, TouchableOpacity, Divider } from '@shoutem/ui';
import MnemonicSign from '../components/MnemonicSign';
import TelephoneSign from '../components/TelephoneSign';


//登陆页面
export default class SignInScreen extends React.Component {
    static navigationOptions = {
        headerTitle: '登陆',
        headerStyle:{
            elevation:0,
            shadowOpacity: 0
        },
        headerTitleStyle:{
            fontSize:18,
            alignSelf:'center',
            flex:1, 
            textAlign: 'center'
        }, 
       
    };
  
     constructor(props) {
        super(props);
        this.state = {
            mnemonic: '',
            isLoading: false,
            tabIsMnemonic:true,
        };
    }


   setLoading(isLoading) {
     console.log('llllll:',isLoading);
       this.setState({isLoading:isLoading});
   }

    render() {
        const { tabIsMnemonic } = this.state;
        // console.log(';;;;',tabIsMnemonic);
        return (
            <Screen style={styles.container} >
                {this.state.isLoading ?
                    <Screen style={styles.container2} >
                        <Spinner />
                    </Screen>
                    :
                    <Screen >
                        <View style={styles.header} >
                            <TouchableOpacity
                                style={styles.headerOne}
                                onPress={() => {
                                    this.setState({tabIsMnemonic:true});
                                }}
                            >
                                <Text style={tabIsMnemonic?styles.headerTextSelected:styles.headerText}> 助记词</Text>
                               { tabIsMnemonic &&
                                    <Divider
                                    styleName="line"
                                    style={styles.headerLine}
                                />
                                }
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.headerOne}
                                onPress={() => {
                                    this.setState({tabIsMnemonic:false});
                                }}
                            >
                                <Text
                                    style={!tabIsMnemonic?styles.headerTextSelected:styles.headerText}
                                >
                                   手机号
                                </Text>
                                { !tabIsMnemonic &&
                                    <Divider
                                    styleName="line"
                                    style={styles.headerLine}
                                />
                                }
                            </TouchableOpacity>
                        </View>
                        {   tabIsMnemonic
                            ?
                                <MnemonicSign 
                                    navigation = {this.props.navigation}
                                    setLoading={
                                        (isLoading)=>this.setLoading(isLoading) 
                                    }
                                />  
                            :
                            <TelephoneSign 
                                navigation = {this.props.navigation}
                                setLoading={
                                    (isLoading)=>this.setLoading(isLoading) 
                                }
                            />
                        }
                    </Screen>}
                
            </Screen>
        )
    }
  
    signInAsync = () => {
        AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Home');
    };
  }
  
  const styles = StyleSheet.create({
    header: {
        height: 45,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    headerOne: {
        // marginTop:45,
        width: '50%',
        height: '100%',
        padding: 'auto',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 17
    },
    headerTextSelected: {
        fontSize: 17,
        color: '#000000'
    },
    headerLine: {
        width: 25,
        height: 4,
        backgroundColor: '#308EFF',
        margin: 'auto',
        marginBottom: 0,
    },
    container: {
        // backgroundColor: 'white',
    },
    container2: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center'
    },
  });




// import React, { Fragment } from 'react'
// import {
//     StyleSheet
// } from 'react-native'

// import { Screen, Text, Spinner, View, TouchableOpacity, Divider } from '@shoutem/ui';
// import MnemonicSign from '../components/MnemonicSign';
// import TelephoneSign from '../components/TelephoneSign';

// export default class SignIn extends React.Component {
//     static get options() {
//         return {
//             topBar: {
//                 elevation: 0,
//                 borderColor: 'white',
//                 borderHeight: 0,
//                 title: {
//                     text: '登录',
//                     alignment: "center"
//                 },
//                 backButton: {
//                     visible: false,
//                 },
//                 navBarNoBorder: true,
//                 hideShadow: true,
//                 noBorder: true,
//                 leftButtons: [],
//             }
//         };
//     }

//     constructor(props) {
//         super(props);
//         this.state = {
//             mnemonic: '',
//             isLoading: false,
//             tabIsMnemonic:true,
//         };
//         // Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
//     }


//    setLoading(isLoading) {
//        this.setState({isLoading:isLoading});
//    }

//     render() {
//         const {tabIsMnemonic} = this.state;
//         return (
//             <Screen style={styles.container} >
//                 {this.state.isLoading ?
//                     <Screen style={styles.container2} >
//                         <Spinner />
//                     </Screen>
//                     :
//                     <Screen >
//                         <View style={styles.header} >
//                             <TouchableOpacity
//                                 style={styles.headerOne}
//                                 onPress={() => {
//                                     this.setState({tabIsMnemonic:true});
//                                 }}
//                             >
//                                 <Text style={tabIsMnemonic?styles.headerTextSelected:styles.headerText}> 助记词</Text>
//                                { tabIsMnemonic &&
//                                     <Divider
//                                     styleName="line"
//                                     style={styles.headerLine}
//                                 />
//                                 }
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 style={styles.headerOne}
//                                 onPress={() => {
//                                     this.setState({tabIsMnemonic:false});
//                                 }}
//                             >
//                                 <Text
//                                     style={!tabIsMnemonic?styles.headerTextSelected:styles.headerText}
//                                 >
//                                    手机号
//                                 </Text>
//                                 { !tabIsMnemonic &&
//                                     <Divider
//                                     styleName="line"
//                                     style={styles.headerLine}
//                                 />
//                                 }
//                             </TouchableOpacity>
//                         </View>
//                         {   tabIsMnemonic
//                             ?
//                                 <MnemonicSign 
//                                     setLoading={
//                                         (isLoading)=>this.setLoading(isLoading) 
//                                     }
//                                 />  
//                             :
//                             <TelephoneSign 
//                                 setLoading={
//                                     (isLoading)=>this.setLoading(isLoading) 
//                                 }
//                             />
//                         }
//                     </Screen>}
                
//             </Screen>
//         )
//     }
// }

// const styles = StyleSheet.create({
    
//     header: {
//         height: 45,
//         backgroundColor: 'white',
//         flexDirection: 'row',
//     },
//     headerOne: {
//         // marginTop:45,
//         width: '50%',
//         height: '100%',
//         padding: 'auto',
//         alignItems: 'center',
//     },
//     headerText: {
//         fontSize: 17
//     },
//     headerTextSelected: {
//         fontSize: 17,
//         color: '#000000'
//     },
//     headerLine: {
//         width: 25,
//         height: 4,
//         backgroundColor: '#308EFF',
//         margin: 'auto',
//         marginBottom: 0,
//     },
//     container: {
//         // backgroundColor: 'white',
//     },
//     container2: {
//         flex: 1,
//         marginTop: 10,
//         alignItems: 'center'
//     },
// })