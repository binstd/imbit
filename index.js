/** @format */

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