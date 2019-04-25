import React, {Component} from 'react';
import { AsyncStorage} from 'react-native';

import createRootNavigator from './src/Initialising';

import { createAppContainer } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';


// @observer
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          signedIn: false,
          checkedSignIn: false
        };
      }
    
      componentDidMount() {
     
        AsyncStorage.getItem('userinfo').then( (data) => {
            this.setState({
                signedIn:data ? true : false,
                checkedSignIn: true
            });
            SplashScreen.hide();
        });

       
      }

     render() {
        const {signedIn} = this.state; 
        console.log('signedIn:',signedIn);

        const AppContainer = createAppContainer(createRootNavigator(signedIn));
        
        return <AppContainer />;
    }
  }
