import React, { Fragment } from 'react'
import {
  StyleSheet,
  AsyncStorage
} from 'react-native';

import { observer } from 'mobx-react/native';

import { Screen, View, TextInput, Button, Text, Divider } from '@shoutem/ui';


// @observer
export default observer( class MnemonicToldScreen extends React.Component {
  
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '提示',
            headerStyle:{
                elevation:0,
                shadowOpacity: 0
            },
            headerTitleStyle:{
                fontSize:19,
                alignSelf:'center',
                flex:1, 
                textAlign: 'center'
            }, 
        }
    };
    


  render() {
    return (
      <Screen style={styles.container}>
        <Screen styleName="paper"
            style={{
                flex: 1,  
                // justifyContent: 'center',
                marginTop: 100,
                height: 80,
                // marginBottom: 10,
                
            }}
        >
            <Text styleName="md-gutter multiline"
             style={{
                marginTop: 1,
                marginBottom: 1,
            }}
            >
                请确认您的周围无人，确保周围没有摄像头的环境下备份。
            </Text>
            <Text styleName="md-gutter multiline"
             style={{
                marginTop: 1,
                marginBottom: 1,
            }}
            >
               因为如果他人获取您的助记词，将会对您的身份下的全部数据和资产造成损害。
            </Text>
            <Text styleName="md-gutter multiline" 
             style={{
                marginTop: 1,
                marginBottom: 1,
            }}
            >
                请抄下助记词，并存在在安全的地方。
            </Text>
        </Screen>
        <Divider styleName="line" />
        <View
          style={{
                flex: 1,  
                justifyContent: 'center',
                marginBottom: 10,
                // height:90,
                width:'100%',
                padding: 'auto',
            }}
        >  
            <Button 
                    styleName="secondary" 
                    style={{
                        width: '90%',
                        margin: 'auto',
                        // marginTop: 0,
                        backgroundColor:'#308EFF',
                        borderColor:'#308EFF'
                    }}
                    // onPress={this.signIn}
                    onPress={() => {
                        this.props.navigation.navigate('MnemonicBackup');
                        // Navigation.push(this.props.componentId, {
                        //     component: {
                        //         name: 'MnemonicBackup',
                        //     }
                        // });
                    }}
            >
                    <Text>备份身份</Text>
            </Button>
            <Button 
                styleName="secondary" 
                style={{
                    width: '90%',
                    margin: 'auto',
                    marginTop: 5,
                    marginBottom:80,
                    backgroundColor:'#308EFF',
                    borderColor:'#308EFF'
                }}
                // onPress={goHome}
            >
                <Text>稍后备份</Text>
            </Button>
        </View>
       
      </Screen>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})