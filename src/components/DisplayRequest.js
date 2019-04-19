import * as React from "react";
// import styled from "styled-components";
import { convertHexToUtf8 } from "@walletconnect/utils";
// import Column from "./Column";
// import Button from "./Button";
import {
    AsyncStorage,
    // Button,
    StyleSheet,
} from 'react-native';

import {
    ScrollView,
    Icon,
    Row,
    Subtitle,
    Text,
    TextInput,
    Button,
    View,
    Divider,
    Spinner,
    Screen,
    Caption,
    Image,
    TouchableOpacity
} from '@shoutem/ui';

class DisplayRequest extends React.Component{

    constructor(props) {
        super(props);
    }
    render() {
        const {
        displayRequest,
        peerMeta,
        approveRequest,
        rejectRequest
        } = this.props;

    let params = [{ label: "Method", value: displayRequest.method }];

    switch (displayRequest.method) {
      case "eth_sendTransaction":
        params = [
          ...params,
          { label: "From", value: displayRequest.params[0].from },
          { label: "To", value: displayRequest.params[0].to },
          {
            label: "Gas",
            value:
              displayRequest.params[0].gas || displayRequest.params[0].gasLimit
          },
          { label: "Gas Price", value: displayRequest.params[0].gasPrice },
          { label: "Nonce", value: displayRequest.params[0].nonce },
          { label: "Value", value: displayRequest.params[0].value },
          { label: "Data", value: displayRequest.params[0].data }
        ];
        break;

      case "eth_sign":
        params = [
          ...params,
          { label: "Address", value: displayRequest.params[0] },
          { label: "Message", value: displayRequest.params[1] }
        ];
        break;
      case "personal_sign":
        params = [
          ...params,
          { label: "Address", value: displayRequest.params[0] },
          {
            label: "Message",
            value: convertHexToUtf8(displayRequest.params[1])
          }
        ];
        break;
      default:
        params = [
          ...params,
          {
            label: "params",
            value: JSON.stringify(displayRequest.params, null, "\t")
          }
        ];
        break;
    }
    return (
      <View>
        {/* <h6>{"Request From"}</h6>
        <SConnectedPeer>
          <img src={peerMeta.icons[0]} alt={peerMeta.name} />
          <div>{peerMeta.name}</div>
        </SConnectedPeer> */}
       <View style={styles.scroll}  >
            <ScrollView   >
                {params.map(param => (
                    <Row key={param.label}>
                        <View styleName="vertical"  >
                            <View styleName="horizontal space-between">
                                <Subtitle>{param.label}</Subtitle>
                            </View>
                            <Text styleName="multiline">
                                {param.value}
                            </Text>
                        </View>  
                    </Row>   
                ))}
            </ScrollView>
        </View>
         <View styleName="horizontal"  style={styles.bottonview} >
            <Button 
                styleName="confirmation secondary"
                style={styles.approve}
                onPress={approveRequest}
            >
                <Text>确认</Text>
            </Button>

            <Button 
                styleName="confirmation"
                style={styles.reject}
                onPress={rejectRequest}
            >
                <Text>拒绝</Text>
            </Button>
        </View>

      </View>
    );
  }
}

export default DisplayRequest;

const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: 'white',
    // },
    scroll:{
        height:'85%'
    },
    bottonview:{
        // marginTop:'',
        width:'100%',
        height:90,            
    },
    container2: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center'
    },
    approve:{
        width:'30%',
        backgroundColor:'#308EFF',
        borderColor: '#308EFF',
    },
    reject:{
        width:'30%',
        color:'#308EFF',
        borderColor: '#308EFF',
    }
    
});


