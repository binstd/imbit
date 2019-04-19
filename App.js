import React, {Component} from 'react';
import { AsyncStorage} from 'react-native';
import createRootNavigator from './src/Init';

import { createAppContainer } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
// import { getConsoleOutput } from '@jest/console';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          signedIn: false,
          checkedSignIn: false
        };
      }
    
      componentDidMount() {
        SplashScreen.hide();
        AsyncStorage.getItem('userToken').then(res => {
            this.setState({ signedIn: res, checkedSignIn: true }); 
        }); 
      }

     render() {
        const {signedIn} = this.state; 
        console.log('signedIn:',signedIn);

        const AppContainer = createAppContainer(createRootNavigator(signedIn));
        
        return <AppContainer />;
    }
  }
