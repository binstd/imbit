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
    ListView,
    Text,
    Row
} from '@shoutem/ui';
import userModel from '../model/userModel';

export default class MyMoneyScreen extends React.Component {
    static get options() {
        return {
          topBar: {
            noBorder: true,
            elevation: 0,
            title: {
              text: '我的资产',
              alignment: "center"
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
    
    async componentDidMount () {
        // https://blockscout.com/eth/mainnet/api?module=account&action=tokenlist&address=
        // const address = '0x81D723361d4F3e648F2c9c479d88DC6dEBF4fA5f';
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
        // 0xded8f0646c28678510f6cc98a948e5927cb616af
        console.log(data);
        console.log(balance);
        this.setState({
             tokenList:[{symbol:'eth',balance:balance.result},...data.result]
        });
        
    }


    renderRow(token) {

        return (
            <View style={{width:'100%',backgroundColor:'white'}}>
                <Row style={{width:'80%',marginLeft:'15%',}} >
                    <View 
                        styleName="horizontal stretch space-between" 
                    >
                        {
                            token.symbol === 'eth'?
                            <Subtitle>
                                {token.balance/Math.pow(10,18)}
                            </Subtitle>
                            :
                            <Subtitle>
                                {token.balance/Math.pow(10,token.decimals)}
                            </Subtitle>
                        }
                       
                        <Caption>{token.symbol}</Caption>
                    </View>
                       
                    {/* <Text styleName="disclosure" name="right-arrow" >ETH</Text>  */}
                </Row>
                <Divider
                    styleName="line"
                    style={styles.inputLine}
                /> 
            </View>
  
        );
    }

    render() {
     const tokenList = this.state.tokenList;
      return (
        <View style={styles.container}>
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
  }

  const styles = StyleSheet.create({
    container: {
        // backgroundColor:'white',
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