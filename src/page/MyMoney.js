import React from 'react';
import {
  AsyncStorage, 
  StyleSheet,
} from 'react-native';
import {
    View,
    Image,
    ListView,
    Text,
    Row
} from '@shoutem/ui';

export default class MyMoneyScreen extends React.Component {
    static navigationOptions = {
      title: '我的资产',
    };

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
            restaurants: [
              {
                "name": "10000",
                "address": "185 Sutter St, San Francisco, CA 94109",
                "image": { "url": "https://shoutem.github.io/img/ui-toolkit/examples/image-9.png" },
              },
              {
                "name": "0.54545",
                "address": "527 Broome St, New York, NY 10013",
                "image": { "url": "https://shoutem.github.io/img/ui-toolkit/examples/image-9.png" },
              },
              {
                "name": "1000.323",
                "address": "225 Mulberry St, New York, NY 10012",
                "image": { "url": "https://shoutem.github.io/img/ui-toolkit/examples/image-9.png" },
              },
              {
                "name": "Sushi Academy",
                "address": "1900 Warner Ave. Unit A Santa Ana, CA",
                "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-4.jpg" },
              },
              {
                "name": "Sushibo",
                "address": "35 Sipes Key, New York, NY 10012",
                "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
              },
              {
                "name": "Mastergrill",
                "address": "550 Upton Rue, San Francisco, CA 94109",
                "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-6.jpg" },
              }
            ],
          }
    }

    renderRow(restaurant) {
        return (
       
            <Row style={{width:'100%'}}>
                <Image
                    styleName="small-avatar"
                    source={{ uri: restaurant.image.url }}
                />
                <Text>{restaurant.name}</Text> 
            </Row>
  
        );
    }

    render() {
     const restaurants = this.state.restaurants;
      return (
        <View style={styles.container}>
          <ListView
                data={restaurants}
                renderRow={this.renderRow}
            />
        </View>
      );
    }
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
  }

  const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
  });