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

export default class MyMoneyScreen extends React.Component {
    static navigationOptions = {
      title: '我的资产',
    };

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
            tokenList: [
                {
                "balance": "10000",
                "contract": { "symbol": "BIN" },
                },
                {
                "balance": "1.5",
                "contract": { "symbol": "ETH" },
                },
                {
                "balance": "2.55",
                "contract": { "symbol": "JKC" },
                },    
            ],
          }
    }

    renderRow(token) {
        return (
            <View style={{width:'100%',backgroundColor:'white'}}>
                <Row style={{width:'80%',marginLeft:'15%',}} >
                    <View 
                        styleName="horizontal stretch space-between" 
                    >
                        <Subtitle>{token.balance}</Subtitle>
                        <Caption>{token.contract.symbol}</Caption>
                    </View>
            
                    {/* <Text styleName="disclosure" name="right-arrow" >ETH</Text>  */}
                </Row>
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

  });