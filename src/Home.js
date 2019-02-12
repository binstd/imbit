import React from 'react'
import {
//   View,
//   Text,
//   Button,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import { goToAuth } from './initNavigation'
import {Navigation} from 'react-native-navigation';

import { USER_KEY } from './config'
import { Screen,Overlay, Heading,Title,Subtitle, Button, Icon,Text } from '@shoutem/ui';

export default class Home extends React.Component {

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
        <Screen styleName="full-screen">
             <Overlay>
                <Overlay styleName="collapsed"><Heading>-20%</Heading></Overlay>
                <Title styleName="md-gutter-top">COOL BLACK AND WHITE STYLISH WATCHES</Title>
                <Subtitle styleName="line-through sm-gutter-top">$280.00</Subtitle>
                <Heading>$250.00</Heading>
                <Button styleName="md-gutter-top"   onPress={this.logout}  ><Icon name="cart" /><Text>退出</Text></Button>
            </Overlay>
        </Screen>
       
    //   <View style={styles.container}>
    //     <Text>Hello from Home s222creen.111</Text>
    //     <Button
    //       onPress={this.logout}
    //       title="Sign Out"
    //     />
    //    {/* <Image
    //         styleName="medium"
    //         style={{width:'300px'}}
    //         source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png'}}
    //     /> */}
    //   </View>
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