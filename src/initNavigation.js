import { Navigation } from 'react-native-navigation'

const iconColor = '#878787'
const textColor = '#878787'
const selectedIconColor = "#030303";
const selectedTextColor = "#030303";

export const goToAuth2 = () => Navigation.setRoot({
    root: {
        bottomTabs: {
            hideShadow: true,
            noBorder: true,
            children: [
                {
                    component: {
                        name: 'SignIn',
                        options: {
                            bottomTab: {
                                noBorder: true,
                                iconColor,
                                textColor,
                                selectedIconColor,
                                selectedTextColor,
                                fontSize: 11,
                                text: '登录',
                                icon: require('./img/signin.png')
                            }
                        }
                    },
                },
                {
                    component: {
                        name: 'SignUp',
                        noBorder: true,
                        options: {
                            bottomTab: {
                                noBorder: true,
                                iconColor,
                                textColor,
                                selectedIconColor,
                                selectedTextColor,
                                text: '新用户',
                                fontSize: 11,
                                icon: require('./img/signup.png')
                            }
                        }
                    },
                },
            ],
        }
    }
});


export const goToAuth = () => Navigation.setRoot({
    root: {
        stack: {
            id: 'Auth',
            children: [
                {  
                    component: {
                        name: 'SignUp',
                    },
                    component: {
                        name: 'TraditionalSignIn',
                    },
                    component: {
                        name: 'SignIn',
                    },
                }
            ],
        }
    }
})  

export const goHome = () => Navigation.setRoot({
        root: {
            stack: {
                id: 'App',
                children: [
                    {
                        component: {
                            name: 'Home',
                        }
                    }
                ],
            }
        }
    })


export const goMnomonic = () => Navigation.setRoot({
        root: {
            stack: {
                id: 'Mnomonic',
                children: [
                    {
                        component: {
                            name: 'MnemonicConfirm',
                        },
                        component: {
                            name: 'MnemonicBackup',
                        },
                        component: {
                            name: 'MnemonicTold',
                        }
                    }
                ],
            }
        }
})   


export const goUserInfo = () => Navigation.setRoot({
    root: {
        stack: {
            id: 'UserInfo',
            children: [
                {
                    component: {
                        name: 'Register',
                    }
                }
            ],
        }
    }
});  

export function registerScreens() {
    Navigation.registerComponent('Home', () => require('./page/Home').default);
    Navigation.registerComponent('Initializing', () => require('./Initialising').default);
    Navigation.registerComponent('SignIn', () => require('./page/SignIn').default);
    Navigation.registerComponent('TraditionalSignIn', () => require('./page/TraditionalSignIn').default);
    Navigation.registerComponent('SignUp', () => require('./page/SignUp').default);
    Navigation.registerComponent('SettingTelephone', () => require('./page/SettingTelephone').default); 
    Navigation.registerComponent('Register', () => require('./page/Register').default); 
    Navigation.registerComponent('About', () => require('./page/About').default);
    Navigation.registerComponent('Translate', () => require('./page/Translate').default);
    Navigation.registerComponent('SettingUserInfo', () => require('./page/SettingUserInfo').default);
    Navigation.registerComponent('Setting', () => require('./page/Setting').default);
    Navigation.registerComponent('QRCodeScannerScreen', () => require('./page/QRCodeScannerScreen').default);
    Navigation.registerComponent('Connect', () => require('./page/Connect').default);
    Navigation.registerComponent('MnemonicTold', () => require('./mnemonic/Told').default);
    Navigation.registerComponent('MnemonicBackup', () => require('./mnemonic/Backup').default);
    Navigation.registerComponent('MnemonicConfirm', () => require('./mnemonic/Confirm').default);
}

