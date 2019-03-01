/** @format */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import './shim.js';
// import crypto from 'crypto';

import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/initNavigation';

if(__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing'
      }
    },
  });
});