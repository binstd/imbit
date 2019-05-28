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
    TouchableOpacity,
    Caption,
    ListView,
    Text,
    Row
} from '@shoutem/ui';
import UserStore from '../model/UserStore';
import {ALLOW_NETWORK} from '../helper/Config';
import tokenStore from '../model/tokenStore';
import { observer } from 'mobx-react/native';

@observer
export default class MyMoneyScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '我的资产',
            headerStyle:{
                elevation:0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
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
    
    async componentDidMount () {
        console.log(UserStore.network);
        
        const userNetwork = UserStore.network.split("-");
        let data = await fetch(`https://blockscout.com/${userNetwork[0]}/${userNetwork[1]}/api?module=account&action=tokenlist&address=${UserStore.address}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'get'
        }).then(response => response.json());
        // let balance = await fetch(`https://blockscout.com/${userNetwork[0]}/${userNetwork[1]}/api?module=account&action=balance&address=${UserStore.address}`, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     method: 'get'
        // }).then(response => response.json());
        this.setState({
             tokenList:[{symbol:'eth',balance:tokenStore.balance},...data.result]
        });
        
    }

    renderRow(token) {

        return (
        
               <TouchableOpacity 
                    style={{width:'100%',backgroundColor:'white'}}
                    onPress={() => {
                        console.log('\n token =>',token);
                        this.props.navigation.navigate('WalletTokentx', {
                            token
                          });
                    }}
                >
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
                            
                    </Row>
               
                    <Divider
                        styleName="line"
                        style={styles.inputLine}
                    /> 
                </TouchableOpacity>
    
  
        );
    }

    render() {
     const tokenList = this.state.tokenList;
     console.log('=== >>',tokenList);
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