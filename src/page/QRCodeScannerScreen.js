import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Container from '../components/Container';
import Text from '../components/Text';
// import { walletConnectNewSession } from '../helpers/walletconnect';
// import { walletConnectOnSessionRequest } from '../helpers/walletOne';
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
const StyledText = styled(Text)`
  flex-wrap: wrap;
  text-align: center;
  height: 100px;
  font-size: 18px;
  padding-top: 32px;
  margin: 0;
`;

// 扫码
class QRCodeScannerScreen extends Component {
  onRead = async event => {
    const uri = event.data;
    console.log('uri => \n',uri);
    if (uri && typeof uri === 'string') {
       
         Navigation.push(this.props.componentId, {
            component: {
              name: 'Connect',
              passProps: {
                uri: uri
              },
            
            }
        });
        //  await walletConnectNewSession(uri);
    }
  };
  
  render() {
    console.log(this.props);
    return (
      <Container>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <StyledText color="#777">{'扫码操作'}</StyledText>
        </View>
        <QRCodeScanner
          topViewStyle={{ flex: 0, height: 0 }}
          bottomViewStyle={{ flex: 0, height: 0 }}
          style={{ flex: 1 }}
          ref={c => {
            this.qrCodeScanner = c;
          }}
          onRead={this.onRead}
        />
      </Container>
    );
  }
}

QRCodeScannerScreen.propTypes = {
  navigation: PropTypes.any,
};

export default QRCodeScannerScreen;
