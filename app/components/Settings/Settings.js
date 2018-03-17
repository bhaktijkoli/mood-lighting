import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Toast } from 'native-base'
import Expo from 'expo'

var IP_KEY = "mood_lighting_ipaddress"
var PIN_R = "mood_lighting_pin_r"
var PIN_G = "mood_lighting_pin_g"
var PIN_B = "mood_lighting_pin_b"

class Home extends React.Component {
  static navigationOptions = { title: 'Settings' };
  constructor(props) {
    super(props);
    this.state={ipaddress:'192.168.1.45',pin_r:'4',pin_g:'4',pin_b:'4'};
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
  handleSave() {
    AsyncStorage.setItem(IP_KEY, this.state.ipaddress);
    AsyncStorage.setItem(PIN_R, this.state.pin_r);
    AsyncStorage.setItem(PIN_G, this.state.pin_g);
    AsyncStorage.setItem(PIN_B, this.state.pin_b);
    Toast.show({text: "Settings Saved.", position:'bottom', buttonText:'Ok'})
    this.props.navigation.navigate('Home');
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.view}>
          <Form>
            <Item floatingLabel last>
              <Label style={{color:'white'}}>Pin R</Label>
              <Input style={{color:'white'}} value={this.state.pin_r} onChangeText={v => this.setState({pin_r:v})}/>
            </Item>
            <Item floatingLabel last>
              <Label style={{color:'white'}}>Pin G</Label>
              <Input style={{color:'white'}} value={this.state.pin_g} onChangeText={v => this.setState({pin_g:v})}/>
            </Item>
            <Item floatingLabel last>
              <Label style={{color:'white'}}>Pin B</Label>
              <Input style={{color:'white'}} value={this.state.pin_b} onChangeText={v => this.setState({pin_b:v})}/>
            </Item>
            <Item floatingLabel last>
              <Label style={{color:'white'}}>IP</Label>
              <Input style={{color:'white'}} value={this.state.ipaddress} onChangeText={v => this.setState({ipaddress:v})}/>
            </Item>
            <Button block light onPress={this.handleSave.bind(this)} style={{marginTop:20}}>
              <Text>Save</Text>
            </Button>
          </Form>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#2f3640',
    flex: 1,
    flexDirection:'column',
  },
  view: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
