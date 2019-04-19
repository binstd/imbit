/** @format */
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
