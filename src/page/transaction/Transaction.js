
// import React from 'react';
// import {
//   AsyncStorage, 
//   StyleSheet,
// } from 'react-native';
// import {
//     View,
//     Divider,
//     Subtitle,
//     Caption,
//     ListView,
//     Row
// } from '@shoutem/ui';
// import userModel from '../../model/userModel';
// import ChooseSymbol from './ChooseSymbol';
// import TransactionInput from './TransactionInput';
// export default class Transaction extends React.Component {
//     // static navigationOptions = {
//     //   title: '转账',
//     // };
   
//     constructor(props) {
//         super(props);
//         // this.renderRow = this.renderRow.bind(this);
//         this.state = {
//             tokenInfo: {}
//           }
//     }
    
//     TransactionToken(tokenInfo) {
//         console.log('TransactionToken',tokenInfo);
//         this.setState({tokenInfo:tokenInfo});
//     }

//     render() {
//     //  const tokenList = this.state.tokenList;
//       return (
//         <View style={styles.container}>
//             {
//                 this.state.tokenInfo?
//                 <TransactionInput  
//                     tokenInfo={this.state.tokenInfo}
//                 />  
//                 :
//                 <ChooseSymbol  
//                     TransactionToken={
//                         (tokenInfo) => this.TransactionToken(tokenInfo) 
//                     }
//                 />
//             }              
//         </View>
//       );
//     }

//   }

//   const styles = StyleSheet.create({
//     container: {
//         // backgroundColor:'white',
//         backgroundColor: 'white',
//     },
//     inputLine: {
//         width: '90%',
//         height: 1,
//         backgroundColor: '#EEEEEE',
//         margin: 'auto',
//         paddingLeft: 5,
//         marginBottom: 0,
//     },

//   });