
import React from 'react';
import {
  AsyncStorage, 
  StyleSheet,
} from 'react-native';
import {
    View,
    Divider,
    Image,
    ImageBackground,
    Tile,
    Title,
    Subtitle,
    Caption,
    TouchableOpacity,
    Button,
    ListView,
    Text,
    Row
} from '@shoutem/ui';

// import userModel from '../../model/userModel';
// import transactionModel from '../../model/transactionModel';
import { observer } from 'mobx-react/native';
// import { Navigation } from 'react-native-navigation';

export default observer(class TwoFactorList extends React.Component {

    static get options() {
        return {
            topBar: {
                noBorder: true,
                elevation: 0,
                navBarNoBorder: true,
                hideShadow: true,
                title: {
                    text: '双层验证',
                    alignment: "center"
                },
            }
        };
    }

    constructor(props) {
        super(props);
    }

    componentDidMount () {

    }
    
    

    render() {
      return (
        <View>
             <View style={styles.headerView} > 
                <View style={styles.titleRow}>  
                    {/* <Text style={styles.title} >"{`币安`}"验证码:</Text> */}
                    <Caption 
                        styleName="bold"
                        style={{
                            margin:'auto',
                            marginLeft:10,
                            color:'#666666',
                            fontSize: 15,
                            // backgroundColor: 'white',
                        }}
                    > 
                        <Text style={{color:'#308EFF',marginLeft: 0,}}>“{`币安`}”</Text>
                        验证码:
                    </Caption> 
                </View>
                <View style={styles.factorView}>  
                   
                    <Button 
                        style={{
                            width:150,
                            height:50,
                            margin:'auto',
                
                        }} 
                    >
                        <Text>105465</Text>
                    </Button>
                    <Caption 
                            styleName="bold"
                            style={{
                                margin:'auto',
                      
                                color:'#666666',
                                fontSize: 15,
                            }}
                        > 
                            剩余
                            <Text style={{color:'#308EFF',marginLeft: 0,}}>{`53 秒`}</Text>
                            更新
                    </Caption> 
                </View>
             </View>
             <View style={styles.footerView} >
                <Text>双层验证3</Text> 
            </View>
            
        </View>
      );
    }
  
  });

  const styles = StyleSheet.create({
    container: {
        // margin: 100,
        marginTop:100,
        backgroundColor: 'white',
    },
    inputLine: {
        width: '90%',
        height: 1,
        backgroundColor: '#EEEEEE',
        margin: 'auto',
        paddingLeft: 5,
        marginBottom: 0,
    },
    headerView:{
        height: 180,
        backgroundColor: '#0f0f0f0f',
    },
    titleRow:{
        height: 45,
        marginTop:10,
        // backgroundColor: 'white',
        flexDirection: 'row',
    },
    title: {
        width: '60%',
        height: '100%',
        padding: 'auto',
        // paddingLeft:10,
        alignItems: 'center',
    },
    factorView:{
            // marginTop:45,
        width: 300,
        height: 90,
        margin:'auto',
        padding: 'auto',
        alignItems: 'center',
    },
    footerView:{
        height: 'auto',
        backgroundColor: '#335000',
    }
  });