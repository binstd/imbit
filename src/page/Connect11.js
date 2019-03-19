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
import { observer } from 'mobx-react/native';

import {
    Row,
    Text,
    Button,
    Screen
} from '@shoutem/ui';

export default observer( class Connect extends React.Component {

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
                        text: 'Connect',
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
            uri:'',
            loading: false
        };
    }

  

    async componentDidMount() {
       console.log('this.props.uri => \n',this.props.uri);
    }

    render() {
        console.log('props; ', this.props)
        const {address} = this.state;
        // console.log(address);
        return (
            <Screen styleName="paper full-screen"
                style={{
                    flex: 1,  
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
              
                <Row
                    style={{ 
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
            
        )
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer:{
        margin:'auto',
        marginTop:5,
        // alignItems: 'center',
    },
})