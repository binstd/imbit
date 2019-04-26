
import React from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { Screen, View, TextInput, Button, Text } from '@shoutem/ui';

import { observer } from 'mobx-react/native';
import UserStore from '../../model/UserStore';
import {SERVER_URL} from '../../helper/Config';

@observer
export default class SettingUsernameScreen extends React.Component {
    state = {
        username: '', email: '',
    }

    async componentDidMount() {
        const user = UserStore.userInfo;
        this.setState({
            username: UserStore.username,
            email: UserStore.email,
            // telephone:user.telephone
        });
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    commit = async () => {
       let postData = {};
        postData['username'] = this.state.username;
        UserStore.login(postData);

        //中心化操作
        fetch(`${SERVER_URL}api/users/${UserStore.uid}`, {
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'patch'
        }).then(response => response.json()).then( data => {
            let user = {};
            user['username'] = this.state.username;

            if (this.state.email != '') {
                user['email'] = this.state.email;
            }

            if (this.state.telephone != '') {
                user['telephone'] = this.state.telephone;
            }
        });
    }

    render() {
        const { username, email } = this.state;
        return (
            <Screen style={styles.container}>
                <Screen style={styles.containerData}>

                    <TextInput
                        style={styles.input}
                        placeholder='用户名'
                        value={username}
                        autoCapitalize="none"
                        placeholderTextColor='white'
                        onChangeText={val => this.onChangeText('username', val)}
                    />

                  
                    <Button
                        styleName="secondary"
                        style={{
                            // width: 300,
                            // marginTop: 30,
                            width: '90%',
                            marginTop: 10,
                            backgroundColor: '#308EFF',
                            borderColor: '#308EFF',
                        }}
                        onPress={this.commit}
                    >
                        <Text>保存</Text>
                    </Button>
                </Screen>
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        margin: 10,
        padding: 10,
        paddingLeft: 30,
    },
    containerData: {
        marginTop: 10,
        flex: 1,
        alignItems: 'center',
    }

})