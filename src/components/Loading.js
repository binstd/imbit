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
    }
    render() {
        const selectedNetwork = this.state.selectedNetwork;ddc
        return (
            <DropDownMenu
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
    }
});