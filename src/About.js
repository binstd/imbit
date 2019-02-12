import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import { goToAuth } from './initNavigation'

import {
    Html
  } from '@shoutem/ui';
// import { Auth } from 'aws-amplify'
import {Navigation} from 'react-native-navigation';

// import { USER_KEY } from './config'
const htmlcontent = `<h4>作为开发者或许你有如下困扰：</h4>
<ol start="1"><li> 智能合约是什么？什么是公链，联盟链？搞区块链的都是骗子？dapp的项目开发流程和传统流程一致嘛？精通世界上最好的语言，为什么不能做区块链项目？人生苦短想学区块链？如何在自己的技能包里增加区块链技能呢？
</li></ol>

<ol start="2"><li> 你精通智能合约，共识算法，能做钱包，能写区块链浏览器，开发共链。但是在平台接不到区块链单？得不得用人单位，需求方认可？
</li></ol>

<h4>不管你有没有考虑？</h4>
<ol start="1"><li>成立一个优质的区块链开发者社群（想加入？需要扫描文章末尾的二维码，填写申请表额），解决你的一个困扰。
</li></ol>
<ol start="2"><li>  解锁专属区块链技能认证，我们将从社群里挖掘出优质开发者，成为首批解锁认证区块链技能包的开发者。
</li></ol>`;

export default class About extends React.Component {
  static get options() {
    return {
      topBar: {
        noBorder: true,
        title: {
          text: '关于我们'
        },
      }
    };
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Screen 2</Text> */}
        <Html
            body={htmlcontent}
            style={{marginTop: 20,}}
        />
        <Button
          onPress={() => Navigation.pop(this.props.componentId)}
          title="返回"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    alignItems: 'center'
  }
})