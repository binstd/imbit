import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
    View,
    Divider,
    Subtitle,
    Caption,
    ListView,
    Text,
    Row
} from '@shoutem/ui';
import UserStore from '../../model/UserStore';


export default class WalletTokentxScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '交易记录',
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
        this.props.navigation.getParam('');
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