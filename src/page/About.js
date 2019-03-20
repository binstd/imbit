import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import { goToAuth } from '../initNavigation'

import {
    Html,
    ScrollView
  } from '@shoutem/ui';

const htmlcontent = `<p>IMbit是Web3.0时代数字身份系统,可自主控制授权你的身份数据。</p>

<h2>自主掌控身份授权</h2>
<p><img src='https://blockluz-1253389096.cos.ap-beijing.myqcloud.com/blockman/032916.jpg'></p>

<p>IMbit将个人身份归还给个人掌控，以区块链技术为核心，用户自己管理隐私数字，只授权自己想授权。迎接Web3.0,支持身份登陆授权,认证，数据授权，批准交易等自主控制功能。</p>

<h2>扫码&深度链接</h2>
<p><img src='https://blockluz-1253389096.cos.ap-beijing.myqcloud.com/blockman/032648.jpg'></p>

<p>通过扫二维码，使用walletconnect协议,将pc上的Dapps连接到移动imbit客户端,不同app之间支持深度链接跳转app确认授权。用户可以与任何Dapp交互而不包括其私钥，所有授权都通过手机确认。</p>`;

export default class About extends React.Component {
  static get options() {
    return {
      topBar: {
        noBorder: true,
        elevation: 0,
        title: {
          text: '关于我们',
          alignment: "center"
        },
      }
    };
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* <Text>Screen 2</Text> */}
        <Html
            body={htmlcontent}
            style={{width:'85%',margin:'auto', marginTop: 30,}}
        />
      
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center'
  }
})