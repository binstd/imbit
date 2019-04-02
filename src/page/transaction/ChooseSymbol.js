
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
    Button,
    ListView,
    Text,
    Row
} from '@shoutem/ui';

import userModel from '../../model/userModel';
import transactionModel from '../../model/transactionModel';
import { observer } from 'mobx-react/native';
import { Navigation } from 'react-native-navigation';

export default observer(class ChooseSymbol extends React.Component {
    static get options() {
        return {
            topBar: {
                noBorder: true,
                title: {
                    text: '选择转账币种'
                },
            }
        };
    }

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
            tokenList: [    
            ],
        }
    }

    TransactionToken(tokenInfo) {
        console.log('tokenInfo:',tokenInfo);
        transactionModel.tokenInfoSet(tokenInfo); 
        Navigation.push(this.props.componentId, {
            component: {
                name: 'TransactionInput',
            }
        });
    } 

    async componentDidMount () {

        let data = await fetch(`https://blockscout.com/eth/ropsten/api?module=account&action=tokenlist&address=${userModel.address}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'get'
        }).then(response => response.json());
        let balance = await fetch(`https://blockscout.com/eth/ropsten/api?module=account&action=balance&address=${userModel.address}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'get'
        }).then(response => response.json());
        this.setState({
             tokenList:[{symbol:'eth',balance:balance.result},...data.result]
        });   
    }
    
    renderRow(token) {
        return (
            <View style={{width:'100%', backgroundColor:'white',}}>
                <Row style={{width:'80%',marginLeft:'10%',marginTop: 10}} >
                    <Button 
                            style={{
                                width:85,
                                height:40,
                                margin:'auto',
                            }} 
                            onPress={() => {
                                this.TransactionToken(token)
                            }}
                        >
                            <Text>{token.symbol}</Text>
                    </Button> 
                    
                </Row>
            </View>
  
        );
    }

    render() {
     const tokenList = this.state.tokenList;
      return (
          <View>
                
            <ListView
                style={styles.container}
                data={tokenList}
                renderRow={this.renderRow}
            />
        </View>
      );
    }
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
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

  });