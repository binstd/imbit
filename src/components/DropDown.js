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


// import { asyncStorageSave, asyncStorageLoad } from '../helpers/asyncStorage';
// import { USER_KEY } from '../config';


export default class DropDown extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            network: [
                {
                    title: "以太主网络",
                    url:'l4343',
                    code:"main",
                },
                {
                    title: "ropsten网络",
                    url:'l4343',
                    code:"ropsten",
                },
                {
                    title: "kovan网络",
                    code:"kovan",
                    url:'l4343',
                },
            ],
            userInfo:[]
        }
    }

    settingLan(selectedNetwork) {
     
        let {userInfo} = this.state;
        console.log("selectedNetwork:\n", selectedNetwork);
        userInfo['network'] = selectedNetwork.code;
        this.setState({ 
            selectedNetwork: selectedNetwork,
            userInfo:userInfo
        });
        console.log('asyncStorageSave(USER_KEY, userInfo):', userInfo);
        // asyncStorageSave(USER_KEY, userInfo);
    }

    async componentDidMount() {
        // let userInfo = await asyncStorageLoad(USER_KEY);
        for (let item of this.state.network) {
            if(userInfo['network'] === item.code){
                userInfo['network'] = item;
            }
        }
        
        if(!userInfo['network']) {
            console.log('不存在');
        }

        this.setState({
            userInfo:userInfo,
            selectedNetwork:userInfo['network'] ? userInfo['network'] : this.state.network[0]
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