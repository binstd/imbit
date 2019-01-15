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
                fontSize: 12,
                text: '登录',
                icon: require('./signin.png')
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
                fontSize: 12,
                icon: require('./signup.png')
              }
            }
          },
        },
      ],
    }
  }
});

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