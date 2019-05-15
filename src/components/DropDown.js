import React from 'react'
import {
    View,
    //   Text,
    Button,
    StyleSheet,
} from 'react-native'

import {
    Html, Screen, DropDownMenu, Title, Image, Text
} from '@shoutem/ui';
import UserStore from '../model/UserStore';
import {ALLOW_NETWORK} from '../helper/Config';
export default class DropDown extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            network:ALLOW_NETWORK,
        }
    }

    settingLan(selectedNetwork) {
        this.setState({ 
            selectedNetwork: selectedNetwork,
            network:ALLOW_NETWORK,
        });
      
        UserStore.login({network:selectedNetwork.code});
    }

    async componentDidMount() {
        let netCode = UserStore.network;
        let selectedNetwork = {};
        for (let item of this.state.network) {
            if(netCode === item.code){
                selectedNetwork = item;
            }
        }
    
        this.setState({
            selectedNetwork:selectedNetwork ? selectedNetwork : this.state.network[0]
        });
    }

    render() {
        const selectedNetwork = this.state.selectedNetwork;
        // console.log('selectedNetwork:',selectedNetwork);
        return (
            <DropDownMenu
                //   styleName="horizontal"
                options={this.state.network}
                selectedOption={selectedNetwork ? selectedNetwork : this.state.network[0]}
                onOptionSelected={(Lang) => this.settingLan(Lang)}
                titleProperty="title"
                valueProperty="network.code"
                style={{ height: 30 }}
            />
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
});