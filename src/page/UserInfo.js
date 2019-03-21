import React, { Component } from 'react'
import { Alert, StyleSheet, Clipboard,  Dimensions } from 'react-native'
// import { Button, Overlay} from 'react-native-elements'
import QRCode from 'react-native-qrcode';
import { Screen, TextInput, Text, Row, Spinner, Button, Caption, View, ScrollView, TouchableOpacity, Divider } from '@shoutem/ui';
import userModel from '../model/userModel';

class UserInfo extends Component {
    // static navigationOptions = {
    //     title: 'token收款地址',
    // };

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            isVisible:true
        };
    }
    
    async copyAddress() {
        Clipboard.setString(this.state.address);
        let  str = await Clipboard.getString();
        // alert(str);
        Alert.alert('已复制：',str,
            [{text:"好的", onPress:this.confirm}]
        );
    }
    
    componentDidMount() {
        this.setState({
            address:userModel.address,
        });
       
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.qrcode} >
                    <QRCode
                        value={this.state.address}
                        size={250}
                        bgColor='#000000'
                        fgColor='white' 
                    />
                </View>
                <View
                    style={{
                        height:50,
                    }} 
                >
                    <Row 
                        styleName="small" 
                        style={{
                            width:'90%',
                            margin: 'auto',
                            // height:50,
                        }} 
                    >
                        <Text style={styles.text}>{this.state.address}</Text>
                    </Row>
                </View>
                <Button
                    styleName="secondary"
                    style={styles.buttonSign}
                    onPress={() => { 
                        this.copyAddress() 
                    }}
                >
                    <Text >复制地址</Text>
                </Button>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#000000',
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop: 60,
    },
    text: {
        // color: 'white'
        marginTop:6,
    },
    inputContainerStyle: {
        marginTop: 16,
        width: '90%',
    },
    qrcode: {
        backgroundColor: 'white',
        alignItems: 'center',
        width:280,
        height:280,
        paddingTop: 15,  
        marginVertical:20
    },
    buttonSign:{
        marginTop:50,
        width:'90%',
        backgroundColor:'#308EFF',
        borderColor: '#308EFF',
    }
});

export default UserInfo