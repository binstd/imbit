import React from 'react'
import {
  View,
//   Text,
  Button,
  StyleSheet,
} from 'react-native'
import { goToAuth } from './initNavigation'

import {
    Html,Screen,DropDownMenu,Title,Image,Text
} from '@shoutem/ui';

import {Navigation} from 'react-native-navigation';


export default class Translate extends React.Component {
  static get options() {
    return {
      topBar: {
        noBorder: true,
        title: {
          text: '语言选择'
        },
      }
    };
  }
  constructor(props){
    super(props);
    this.state = {
      lang: [
        {
          brand: "简体中文",
          models:
            {
              code: "zh",
              description: "cn "
              + "private subsidiary company, Audi Sport GmbH."
            }
        },
        {
          brand: "English",
          models: {
            code: "en",
            description: "en "
              + "Chiron as a successor to the Veyron."
          }
        },
        {
          brand: "繁体中文",
          models: {
            code: "tw",
            description: "cn-tw "
              + "manufactured by Dodge (SRT for 2013 and 2014)."
          }
        },
      ],
    }
  }
  settingLan(selectedLang){
    console.log("selectedLang:\n",selectedLang);
    this.setState({ selectedLang: selectedLang })
  }

  render() {
    const selectedLang = this.state.selectedLang || this.state.lang[0];
    return (
      <Screen style={styles.container} >
        {/* <Text styleName="md-gutter-horizontal">
           请选择语言:
        </Text> */}
        <DropDownMenu
        //   styleName="horizontal"
          options={this.state.lang}
          selectedOption={selectedLang ? selectedLang : this.state.lang[0]}
          onOptionSelected={(Lang) => this.settingLan(Lang)}
        //   onOptionSelected={(Lang) => this.setState({ selectedLang: Lang })}
          titleProperty="brand"
          valueProperty="lang.code"
          style={{height:30}}
        />
        
        {/* <Text styleName="md-gutter-horizontal">
          {selectedLang ?
            selectedLang.models.description :
            this.state.lang[0].models.description}
        </Text> */}

      </Screen>
    );
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})