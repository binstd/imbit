
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
            <Text>双层验证</Text>   
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

  });