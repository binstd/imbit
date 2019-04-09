
import React from 'react';
import {
  AsyncStorage, 
  StyleSheet,
} from 'react-native';

import speakeasy from 'speakeasy'
import {
    View,
    Divider,
    Image,
    ImageBackground,
    Tile,
    Title,
    Subtitle,
    Caption,
    TouchableOpacity,
    Button,
    ListView,
    Text,
    Row
} from '@shoutem/ui';

// import userModel from '../../model/userModel';
// import transactionModel from '../../model/transactionModel';
import { observer } from 'mobx-react/native';
// import { Navigation } from 'react-native-navigation';
import { Navigation } from 'react-native-navigation';
import timerModel from '../../model/timerModel';
import factorModel from '../../model/factorModel';
import Toast, { DURATION } from 'react-native-easy-toast';

const startList = [
    'luz',
    'mark',
    'tone',
    'luzmarkllll',
    'mark',
    'tone',
    'luz',
    'mark',
    'tone'
];

export default observer(class TwoFactorList extends React.Component {

    static get options() {
        return {
            topBar: {
                noBorder: true,
                elevation: 0,
                navBarNoBorder: true,
                hideShadow: true,
                title: {
                    text: '双层验证',
                    alignment: "center"
                },
            }
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            factors:[],
            selectFactor:{},
            code:'',
        };
    }

    componentDidMount () {
        const factors =  factorModel.getFactorData;
        const selectFactor = factors[0] || {}

        if(selectFactor.startCode){
            const secret = selectFactor.startCode;
            const code = speakeasy.totp({
                secret: secret,
                encoding: 'base32'
            });
            console.log('\n \n secret ======> \n \n',code);  
        
            this.setState({
                factors,
                selectFactor,
                code
            });
        }
       
       
        timerModel.reset();
        if(timerModel > 0) {
            this.refs.toast.show('已重新生成!');
            timerModel.reset();
        }
        console.log(factors);
    }

    componentDidUpdate(){
        if(timerModel.timer == 0){
            this.resetFoctor();
        }
    }   

    //更新    
    resetFoctor() {

        const secret = 'qyyjmaxegqtj2qbp';
        if(this.state.selectFactor.startCode){
            const code = speakeasy.totp({
                secret: this.state.selectFactor.startCode,
                encoding: 'base32'
            });
            this.setState({code});
        }
        timerModel.reset();
    }

    addNewFactor() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'AddNewFactor',
            }
        });
    }
    
    selectedFactor =  (name, startCode) => {
    
        let selectFactor = {name, startCode};
        console.log(selectFactor);
        this.setState({selectFactor});
        this.resetFoctor();
    }

    render() {
    const { factors, selectFactor, code } = this.state;
    //   console.log(selectFactor);  
      return (
        <View>
            { selectFactor.startCode
                  &&
             <View style={styles.headerView} > 
                
                 <View style={styles.titleRow}>  
                    <Caption 
                        styleName="bold"
                        style={{
                            margin:'auto',
                            marginLeft:10,
                            color:'#000000',
                            fontSize: 15,
                            // backgroundColor: 'white',
                        }}
                    > 
                        <Text style={{color:'white',marginLeft: 0,}}>{`“${selectFactor.name}”`}</Text>
                            验证码:
                    </Caption> 
                </View>
               
               
                <View style={styles.factorView}>  
                    <Button 
                        styleName="secondary"
                        style={{
                            width:150,
                            height:50,
                            margin:'auto',
                            color:'#666666',
                        }} 
                    >
                        <Text>{code}</Text>
                    </Button>
                    <Caption 
                            styleName="bold"
                            style={{
                                margin:'auto',
                                color:'#000000',
                                fontSize: 15,
                            }}
                        > 
                            剩余
                            <Text style={{color:'white',marginLeft: 0,}}>{timerModel.timer}</Text>
                            更新
                    </Caption> 
                </View>
             </View>
              }
             <View style={styles.footerView} >
                 <View
                        style={{
                            width:'90%',
                            // height:100,
                            margin:10,
                            flexWrap: 'wrap',
                            flexDirection: 'row'
                        }}
                    >
                      
                        {factors.map(({name, startCode}, i) => 
                                <Button styleName="secondary"
                                style={selectFactor.name == name ? styles.selectFactor:styles.factorlist}
                                key={i}
                                onPress={() => this.selectedFactor(name, startCode)}
                            >
                                <Text>{name}</Text>
                            </Button>
                        )}
                         <Button 
                                styleName="secondary"
                                style={styles.factorendItem}
                                onPress={() => {this.addNewFactor()}}
                            >
                                <Text style={{}}>+</Text>
                            </Button>
                    </View>
            </View>
            <Toast
                    ref="toast"
                    position='top'
                    positionValue={150}
            />
        </View>
      );
    }
  
  });

  const styles = StyleSheet.create({
    container: {
        // margin: 100,
        marginTop:100,
        // backgroundColor: 'white',
    },
    inputLine: {
        width: '90%',
        height: 1,
        backgroundColor: '#EEEEEE',
        margin: 'auto',
        paddingLeft: 5,
        marginBottom: 0,
    },
    headerView:{
        height: 180,
        backgroundColor: '#308EFF',
    },
    titleRow:{
        height: 45,
        marginTop:10,
        flexDirection: 'row',
    },
    title: {
        width: '60%',
        height: '100%',
        padding: 'auto',
        alignItems: 'center',
    },
    factorView:{
            // marginTop:45,
        width: 300,
        height: 90,
        margin:'auto',
        padding: 'auto',
        alignItems: 'center',
    },
    footerView:{
        height: '100%',
        backgroundColor: 'white',
    },
    factorlist: {
        color: 'white',
        marginLeft: 10,
        marginTop:5,
        height:40,
    },
    selectFactor: {
        color: 'white',
        borderColor:'#308EFF',
        backgroundColor: '#308EFF',
        marginLeft: 10,
        marginTop:5,
        height:40,
    },
    factorendItem: {
        backgroundColor: '#308EFF',
        borderColor:'#308EFF',
        marginLeft: 10,
        marginTop:5,
        height:40,
        width:60,
    }
  });