/** @format */
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');

import './global';
import './shim';

import { AppRegistry } from 'react-native';
// import SplashScreen from 'react-native-splash-screen';

import App from './App';
import {name as appName} from './app.json';

if(__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
// SplashScreen.show();
AppRegistry.registerComponent(appName, () => App);
