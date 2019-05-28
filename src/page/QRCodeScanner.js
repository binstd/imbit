import React, { Component } from 'react';

import {
    StyleSheet,
    View
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

// 扫码
class QRCodeScannerScreen extends Component {

    // static get options() {
    //     return {
    //         topBar: {
    //             hideShadow: true,
    //             noBorder: true,
    //             elevation: 0,
    //             title: {
    //                 text: '扫一扫',
    //                 alignment: "center",
    //                 color: 'white'
    //             },
    //             backButton: {
    //                 color: 'white'
    //             },
    //             background: {
    //                 translucent: true,
    //                 color: '#000000',
    //                 // translucent: true,
    //                 blur: false
    //             },
    //         }
    //     };
    // }
    static navigationOptions = {
        title: '扫一扫',
        headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            fontSize: 19,
            alignSelf: 'center',
            flex: 1,
            textAlign: 'center'
        },
        headerRight: (<View></View>)
    };


    onRead = async event => {
        const uri = event.data;
        console.log('uri => \n', uri);
        if (uri && typeof uri === 'string') {
            // console.log('isAddress!');
            // if(Eth.isAddress(uri)) {
            //     console.log('isAddress!');
            //     // transactionModel.toaddressSet(uri);
            //     // Navigation.push(this.props.componentId, {
            //     //     component: {
            //     //         name: 'ChooseSymbol',
            //     //         passProps: {
            //     //             toaddress: uri
            //     //         },
            //     //     }
            //     // });
                
            // } else 
            if(uri.indexOf("wc:") !=-1 ) {
                console.log('包含');
                this.props.navigation.navigate('Connect',{
                    URI: uri,
                  });
                
                //  Navigation.push(this.props.componentId, {
                //     component: {
                //         name: 'Connect',
                //         passProps: {
                //             uri: uri
                //         },

                //     }
                // });
            }
            
            // Navigation.push(this.props.componentId, {
            //     component: {
            //         name: 'Connect',
            //         passProps: {
            //             uri: uri
            //         },

            //     }
            // });
          
        }
    };

    render() {
        console.log(this.props);
        return (
            <View style={styles.container} >
                <QRCodeScanner
                    //   topViewStyle={{ flex: 0, height: 0 }}
                    //   bottomViewStyle={{ flex: 0, height: 0 }}
                    // style={{ height:200, width:200, margin: 'auto', }}
                    ref={c => {
                        this.qrCodeScanner = c;
                    }}
                    onRead={this.onRead}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
});

export default QRCodeScannerScreen;
