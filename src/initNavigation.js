import { Navigation } from 'react-native-navigation'

export const goToAuth = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'BottomTabsId',
      children: [
        {
          component: {
            name: 'SignIn',
            options: {
              bottomTab: {
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
            options: {
              bottomTab: {
                text: '注册',
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


export const 
goHome = () => Navigation.setRoot({
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




export function registerScreens() {
  Navigation.registerComponent('Home', () => require('./view/Home').default);
  Navigation.registerComponent('Initializing', () => require('./view/Initialising').default);
  Navigation.registerComponent('SignIn', () => require('./SignIn').default);
  Navigation.registerComponent('SignUp', () => require('./SignUp').default);
  Navigation.registerComponent('Screen2', () => require('./Screen2').default);
  Navigation.registerComponent('Setting', () => require('./view/Setting').default);
}