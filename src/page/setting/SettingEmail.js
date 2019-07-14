
import React from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { Screen, View, TextInput, Button, Text } from '@shoutem/ui';

import { observer } from 'mobx-react/native';
import UserStore from '../../model/UserStore';
import {SERVER_URL} from '../../helper/Config';
import Toast, { DURATION } from 'react-native-easy-toast';

@observer
export default class SettingEmailScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '修改Email',
            headerStyle:{
                elevation:0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTitleStyle:{
                fontSize:19,
                alignSelf:'center',
                flex:1,
                textAlign: 'center'
            },
            headerRight: (<View></View>)
        }
    };

    state = {
        username: '', email: '',
    }

    async componentDidMount() {
        // const user = UserStore.;
        this.setState({
            username: UserStore.username,
            email: UserStore.email,
        });
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    commit = async () => {
       let postData = {};
        // postData['username'] = this.state.username;
        postData['email'] = this.state.email;
        UserStore.login(postData);
        fetch(`${SERVER_URL}/api/users/${UserStore.uid}`, {
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH'
        }).then(response => response.json()).then( data => {
            let user = {};
            user['username'] = this.state.username;
            if (this.state.email != '') {
                user['email'] = this.state.email;
                this.refs.toast.show('修改成功!');
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
                        placeholder='E-mail'
                        value={email}
                        autoCapitalize="none"
                        placeholderTextColor='white'
                        onChangeText={val => this.onChangeText('email', val)}
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
                    <Toast
                        ref="toast"
                        position='top'
                        positionValue={150}
                    />
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