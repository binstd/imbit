import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import HomeScreen from './page/Home';
import SignInScreen from './page/Sign';
import OtherScreen from './page/Other';
import ConnectScreen from './page/Connect';
import MyMoneyScreen from './page/MyMoney';
import SettingInfoScreen from './page/SettingInfo';
import QRCodeScannerScreen from './page/QRCodeScanner';

const Home = createStackNavigator({  
    Home: HomeScreen, 
    Other: OtherScreen, 
    // Connect: ConnectScreen,
    MyMoney:MyMoneyScreen,
    Setting:SettingInfoScreen,
    QRCodeScanner:QRCodeScannerScreen
});
const Auth = createStackNavigator({ SignIn: SignInScreen });


export default createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
        {
            // AuthLoading: AuthLoadingScreen,
            Home: Home,
            Auth: Auth,
        },
        {
        // initialRouteName: 'AuthLoading',
            initialRouteName: signedIn ? "Home" : "Auth"
        }
    );
  };
  
  