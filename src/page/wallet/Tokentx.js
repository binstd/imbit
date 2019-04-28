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
    Image,
    Button,
    Icon,
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
            tokentxList:[

            ],
            myAddress:''
        }
    }
    
    async componentDidMount () {
        const tokenInfo = this.props.navigation.getParam('token');
        const userNetwork = UserStore.network.split("-");
       
        if(tokenInfo.contractAddress&&UserStore.address){
            let data = await fetch(`https://blockscout.com/${userNetwork[0]}/${userNetwork[1]}/api?module=account&action=tokentx&address=${UserStore.address}&contractaddress=${tokenInfo.contractAddress}&sort=desc`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'get'
            }).then(response => response.json());

            console.log(data.result);
            this.setState({
                 tokentxList:data.result,
                 myAddress:UserStore.address
            });
     }
      if(tokenInfo.symbol === 'eth'){
        // https://blockscout.com/eth/ropsten/api?module=account&action=txlist&address=0xded8f0646c28678510f6cc98a948e5927cb616af
        let data = await fetch(`https://blockscout.com/${userNetwork[0]}/${userNetwork[1]}/api?module=account&action=txlist&address=${UserStore.address}&sort=desc`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'get'
        }).then(response => response.json());
        console.log(data.result);
        this.setState({
                tokentxList:data.result,
                myAddress:UserStore.address
        });
      }
       
        
    }

    toDatetime = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = a.getMonth(); //months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    renderRow(token) {
        console.log(token);
        let address = UserStore.address; 
        let amount = null;
        if(token.contractAddress) {
            amount =  Math.round(token.value/1000000000000000000*100)/100;
        }else {
            amount =  Math.round(token.value/1000000000000000000*100)/100; //token.value/100000000;
        }
        if(token.value === '0') {
            return null;
        }else {
            return (
                <View style={{width:'100%',backgroundColor:'white'}}>
                    <Row>
                        {address === token.from ? <Icon name="up-arrow"/> : <Icon name="down-arrow" /> }
                        <View styleName="vertical stretch space-between">
                            <Caption>{this.toDatetime(token.timeStamp)}</Caption>
                            <Subtitle>{address === token.from?`-`:`+`}{amount}</Subtitle>
                        </View>
                      
                        <Button styleName="right-icon" >
                            <Text style={styles.itemPrice}>{address === token.from?`已发送`:`已接收`}</Text>
                        </Button>
                    </Row>
                    <Divider
                        styleName="line"
                        style={styles.inputLine}
                    /> 
                </View>
            );
        }
       
    }

    render() {
     const tokentxList = this.state.tokentxList;
      return (
        <View style={styles.container}>
          <ListView
                style={styles.container}
                data={tokentxList}
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
    itemPrice:{
        color:'#000000',
        fontSize: 17,
        // width:'20%',
    }

  });