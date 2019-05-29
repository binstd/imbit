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
       console.log('lllllll');
        AsyncStorage.getItem('userinfo').then( (data) => {
            // SplashScreen.show(); 
            this.setState({
                signedIn:data ? true : false,
                checkedSignIn: true
            });
      
            // setTimeout( () => {
            //     SplashScreen.hide(); 
            // }, 500);
        });
        SplashScreen.hide(); 
       
    }

     render() {
        const {signedIn} = this.state; 
        // console.log('signedIn:',signedIn);
        const AppContainer = createAppContainer(createRootNavigator(signedIn));
        
        return <AppContainer />;
    }
  }
