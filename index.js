/** @format */
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import SplashScreen from 'react-native-splash-screen';
if(__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
SplashScreen.hide();
AppRegistry.registerComponent(appName, () => App);
