import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
    View,
    Button,
    ListView,
    Text,
    Row
} from '@shoutem/ui';

import UserStore from '../../model/UserStore';
import transactionModel from '../../model/transactionModel';
import { observer } from 'mobx-react/native';

export default observer(class ChooseSymbolScreen extends React.Component {
  
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '选择转账币种',
            headerStyle:{
                elevation:0,
                shadowOpacity: 0
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

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
            tokenList: [    
            ],
        }
    }

    TransactionToken(tokenInfo) {
        // console.log('transaction token!',tokenInfo);
        transactionModel.tokenInfoSet(tokenInfo); 
        this.props.navigation.navigate('TransactionInput');
    } 

    async componentDidMount () {
        const userNetwork = UserStore.network.split("-");
        let data = await fetch(`https://blockscout.com/${userNetwork[0]}/${userNetwork[1]}/api?module=account&action=tokenlist&address=${UserStore.address}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'get'
        }).then(response => response.json());
        let balance = await fetch(`https://blockscout.com/${userNetwork[0]}/${userNetwork[1]}/api?module=account&action=balance&address=${UserStore.address}`, {
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
                                this.TransactionToken(token);
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
  });

  const styles = StyleSheet.create({
    container: {
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