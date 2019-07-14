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
import tokenStore from '../model/tokenStore';
export default class DropDown extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            network:ALLOW_NETWORK,
        }
    }

    async settingLan(selectedNetwork) {
        this.setState({ 
            selectedNetwork: selectedNetwork,
            network:ALLOW_NETWORK,
        });
      
        UserStore.login({network:selectedNetwork.code});
        const userNetwork = selectedNetwork.code.split("-");
        // let network = ALLOW_NETWORK.filter(item => item.code === UserStore.network)[0];
        console.log(userNetwork);
        let balance = await fetch(`https://blockscout.com/${userNetwork[0]}/${userNetwork[1]}/api?module=account&action=balance&address=${UserStore.address}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'get'
        }).then(response => response.json());

        console.log(`https://blockscout.com/${userNetwork[0]}/${userNetwork[1]}/api?module=account&action=balance&address=${UserStore.address}`);
        await tokenStore.balanceSet(balance.result);
        // if(await tokenStore.balanceSet(balance.result)) {
        //     SplashScreen.hide(); 
        // }
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