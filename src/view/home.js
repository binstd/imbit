import React from 'react'
import {
    //   View,
    //   Text,
    //   Button,
    StyleSheet,
    AsyncStorage
} from 'react-native'
// import { goToAuth } from '../initNavigation'
import { Navigation } from 'react-native-navigation';

import { USER_KEY } from '../config'
import { observer } from 'mobx-react/native';
import userModel from '../model/userModel';
import { asyncStorageLoad } from '../helpers/asyncStorage';
// import { Navigation } from 'react-native-navigation';
import {
    ScrollView,
    Icon,
    Row,
    Subtitle,
    Text,
    Button,
    View,
    Divider,

    Screen,
} from '@shoutem/ui';

import Blockies from 'react-native-blockies';

@observer
export default class Home extends React.Component {

    static options(passProps) {
        return {
            topBar: {
                color: 'red',
                title: {
                    text: ''
                },
                navBarNoBorder: true,
                hideShadow: true,
                noBorder: true,
                rightButtons: [
                    {
                        id: 'Setting',
                        // icon: <Icon name="sidebar" />,
                        text: '设置',
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
            address:''
        };
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }

    navigationButtonPressed({ buttonId }) {
        console.log('buttonId => ', buttonId);
        if (buttonId === 'Setting') {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'Setting',
                }
            });
        }
    }

    logout = async () => {
        try {
            await AsyncStorage.removeItem(USER_KEY)
            goToAuth()
        } catch (err) {
            console.log('error signing out...: ', err)
        }
    }

    async componentDidMount() {
        const user = await asyncStorageLoad(USER_KEY);
        if (user) {
            userModel.allSet(user);
            this.setState({
                address:user.address
            })
        } else {
            this.setState({
                address:userModel.address
            })
        }
    }

    render() {
        console.log('props; ', this.props)
        const {address} = this.state;
        console.log(address);
        return (
            <Screen styleName="paper full-screen"
                style={{
                    // flex: 1,  
                    // justifyContent: 'center',
                    // alignItems: 'center'
                }}
            >

                <Screen styleName="paper"
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        marginTop: 200,
                        height: 300,
                    }}
                >
                    <ScrollView>

                        <Divider styleName="line" />



                            {address?
                              <Row>
                                    <Blockies
                                        blockies={address} //string content to generate icon
                                        size={50} // blocky icon size
                                        style={{ width: 50, height: 50, marginRight: 10, }} // style of the view will wrap the icon
                                        color="#dfe" 
                                        bgColor="#ffe" 
                                        spotColor="#abc"   
                                    />
                                    <View styleName="vertical">
                                        <Subtitle>钱包地址:</Subtitle>
                                        <Text>
                                            {address}
                                        </Text>
                                    </View>
                                </Row>
                            :
                            <Row>  

                            </Row>
                        }
                            
                            
                       

                        <Divider styleName="line" />

                  

                        <Divider styleName="line" />
                    </ScrollView>
                </Screen>

              
                <Row
                    style={{
                        // flex: 1,  
                        justifyContent: 'center',
                        marginBottom: 20,
                        height: 100

                    }}
                >
                    <Button
                        styleName="secondary"
                        style={{ width: 200 }}
                        onPress={() => {
                            Navigation.push(this.props.componentId, {
                                component: {
                                    name: 'QRCodeScannerScreen',
                                }
                            });
                        }}
                    >
                        <Text>扫一扫</Text>
                    </Button>
                </Row>

            </Screen>
            /* <View style={styles.container}>
              <Text>Hello from Home screen.111</Text>
              <Button
                onPress={this.logout}
                title="Sign Out"
              />
              <Button
                onPress={() => {
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: 'Screen2',
                    }
                  });
                }}
                
                title="View next screen"
              />
            </View> */
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})