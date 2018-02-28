import React from 'react';
import { Dimensions, StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Text, Icon, Toast } from 'native-base'
import { ColorWheel } from 'react-native-color-wheel';

var colorsys = require('colorsys');
var axios = require('axios');
let updating = false;

var IP_KEY = "mood_lighting_ipaddress"
var PIN_KEY = "mood_lighting_pin"

class Home extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props)
    this.state={ipaddress:'192.168.1.45',pin:'4'};
  }
  componentDidMount() {
    AsyncStorage.getItem(IP_KEY).then(async (value) => {
      if(value) this.setState({ipaddress:value})
    });
    AsyncStorage.getItem(PIN_KEY).then(async (value) => {
      if(value) this.setState({pin:value})
    });
  }
  handleChange(color) {
    var rgb = colorsys.hsvToRgb(color);
    var url ="http://"+this.state.ip + "/mood?pin=" + this.state.pin +"&r=" + rgb.r +"&g=" + rgb.g  +"&b=" + rgb.b;
    axios.get(url)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      Toast.show({text: "Network error.", position:'bottom', buttonText:'Ok'})
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <ColorWheel
            initialColor="#ee0000"
            onColorChange={this.handleChange.bind(this)}
            thumbStyle={{ height: 10, width: 10, borderRadius: 10}}
            style={{ width: 300, margin: 40 }} />
            <Button transparent light block style={{marginBottom:10}} onPress={e=>this.props.navigation.navigate('Settings')}>
              <Icon name='settings' />
            </Button>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#2f3640',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50,
    },
    view: {
      flex: 1,
    },
  });

  export default Home
