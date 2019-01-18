import React from 'react'
import {
//   View,
//   Text,
//   Button,
  StyleSheet,
  AsyncStorage
} from 'react-native'
// import { goToAuth } from '../initNavigation'
import {Navigation} from 'react-native-navigation';

import { USER_KEY } from '../config'

import {
  ScrollView,
  Icon,
  Row,
  Subtitle,
  Text,
  Button,
  Title,
  View,
  ImageBackground,
  Divider,
  Tile,
  Screen,
} from '@shoutem/ui';


export default class Home extends React.Component {
  
  static options(passProps) {
    return {
      topBar: {
        color: 'red',
        title: {
            text: ''
        },
        navBarNoBorder: true,
        hideShadow: true,
        noBorder: true,
        rightButtons: [
          {
            id: 'Setting',
            // icon: <Icon name="sidebar" />,
            text: '设置',
            color: '#4F4F4F',
            
          }
        ],
        leftButtons: [],
      }
    };
  }
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  navigationButtonPressed({ buttonId }) {
    console.log('buttonId => ',buttonId);
    if (buttonId==='Setting') {
        Navigation.push(this.props.componentId, {
            component: {
            name: 'Setting',
            }
        });
    }
  }

  logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY)
      goToAuth()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }

  render() {
    console.log('props; ', this.props)
    return (
        <Screen styleName="paper full-screen" 
            style={{
                // flex: 1,  
                // justifyContent: 'center',
                // alignItems: 'center'
            }}
        >
      
      <Screen styleName="paper"
            style={{
                flex: 1,  
                justifyContent: 'center',
                marginTop: 200,
                height: 300,
            }}
        >
        <ScrollView>

            {/* <Text styleName="md-gutter multiline">434343</Text> */}
            <Divider styleName="line" />

            <Row>
              <Icon name="laptop" />
              <View styleName="vertical">
                <Subtitle>Visit webpage</Subtitle>
                <Text numberOfLines={1}>434343</Text>
              </View>
            </Row>

            <Divider styleName="line" />

            <Row>
              <Icon name="pin" />
              <View styleName="vertical">
                <Subtitle>Address</Subtitle>
                <Text numberOfLines={1}>43434343</Text>
              </View>
            </Row>
           
            <Divider styleName="line" />

            <Row>
              <Icon name="email" />
              <View styleName="vertical">
                <Subtitle>Email</Subtitle>
                <Text numberOfLines={1}>3232323</Text>
              </View>
            </Row>

            <Divider styleName="line" />
            </ScrollView>
        </Screen>
       
        {/* flex: 1,
    justifyContent: 'center',
    alignItems: 'center' */}
      <Row
       style={{
            // flex: 1,  
            justifyContent: 'center',
            marginBottom:20,
            height:100
            
        }}
      >
        <Button 
                styleName="secondary" 
                style={{width: 200}}
        >
                <Text>扫一扫</Text>
        </Button>
      </Row>
        
      </Screen>
      /* <View style={styles.container}>
        <Text>Hello from Home screen.111</Text>
        <Button
          onPress={this.logout}
          title="Sign Out"
        />
        <Button
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'Screen2',
              }
            });
          }}
          
          title="View next screen"
        />
      </View> */
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})