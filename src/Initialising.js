import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import HomeScreen from './page/Home';
import SignInScreen from './page/Sign';
import OtherScreen from './page/Other';

import MyMoneyScreen from './page/MyMoney';



import SettingInfoScreen from './page/SettingInfo';
import QRCodeScannerScreen from './page/QRCodeScanner';
import TwoFactorListScreen from './page/twofactor/TwoFactorList';
import AddNewFactorScreen from './page/twofactor/AddNewFactor';


import SettingUserMainScreen from './page/setting/SettingUserMain';
import SetttingNewTelephoneScreen from './page/setting/SetttingNewTelephone';
import SettingEmailScreen from './page/setting/SettingEmail';
import SettingUsernameScreen from './page/setting/SettingUsername';



import AboutScreen from './page/About';
import MnemonicToldScreen from './page/mnemonic/Told';
import MnemonicBackupScreen from './page/mnemonic/Backup';
import MnemonicConfirmScreen from './page/mnemonic/Confirm';

import UserInfoScreen from './page/UserInfo';

const Home = createStackNavigator({  
    Home: HomeScreen, 
    Other: OtherScreen, 
    MyMoney:MyMoneyScreen,
    Setting:SettingInfoScreen,
    QRCodeScanner:QRCodeScannerScreen,
    TwoFactorList:TwoFactorListScreen,
    AddNewFactor:AddNewFactorScreen,
    SettingUserMain:SettingUserMainScreen,
    SettingEmail:SettingEmailScreen,
    SettingUsername:SettingUsernameScreen,
    SetttingNewTelephone:SetttingNewTelephoneScreen,
    About:AboutScreen,
    MnemonicTold:MnemonicToldScreen,
    MnemonicBackup:MnemonicBackupScreen,
    MnemonicConfirm:MnemonicConfirmScreen,
    UserInfo:UserInfoScreen,
    // WalletTokentx:WalletTokentxScreen

});
const Auth = createStackNavigator({ SignIn: SignInScreen });


export default createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
        {
            Home: Home,
            Auth: Auth,
        },
        {
            initialRouteName: signedIn ? "Home" : "Auth"
        }
    );
  };
  
  