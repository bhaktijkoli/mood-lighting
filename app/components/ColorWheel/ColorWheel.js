import React from 'react';
import { Dimensions, StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Text, Icon, Toast } from 'native-base'
import { ColorPicker } from 'react-native-color-picker'

var colorsys = require('colorsys');
var axios = require('axios');

var IP_KEY = "mood_lighting_ipaddress"
var PIN_R = "mood_lighting_pin_r"
var PIN_G = "mood_lighting_pin_g"
var PIN_B = "mood_lighting_pin_b"

class ColorWheel extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props)
    this.state={ipaddress:'192.168.1.45',pin_r:'4',pin_g:'4',pin_b:'4',color:{ h: 200, s: 1, v:1 }};
  }
  onColorChange(color) {
    this.setState({ color })
  }
  componentDidMount() {
    AsyncStorage.getItem(IP_KEY).then(async (value) => {
      if(value) this.setState({ipaddress:value})
    });
    AsyncStorage.getItem(PIN_R).then(async (value) => {
      if(value) this.setState({pin_r:value})
    });
    AsyncStorage.getItem(PIN_G).then(async (value) => {
      if(value) this.setState({pin_g:value})
    });
    AsyncStorage.getItem(PIN_B).then(async (value) => {
      if(value) this.setState({pin_b:value})
    });
  }
  handleChange(color) {
    var rgb = colorsys.hexToRgb(color);
    var pins = "pin_r=" + this.state.pin_r + "&pin_g=" + this.state.pin_g + "&pin_b=" + this.state.pin_b;
    var url ="http://"+this.state.ipaddress + "/mood?"+ pins + "&r=" + rgb.r +"&g=" + rgb.g  +"&b=" + rgb.b;
    console.log(url);
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
        <ColorPicker
          color={this.state.color}
          onColorChange={this.onColorChange.bind(this)}
          onColorSelected={this.handleChange.bind(this)}
          onOldColorSelected={this.handleChange.bind(this)}
          style={{flex: 1}}
          hideSliders={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#2f3640',
    padding: 15,
  },
  view: {
    flex: 1,
  },
});

export default ColorWheel
