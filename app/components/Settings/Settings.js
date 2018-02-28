import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base'
import Expo from 'expo'

var IP_KEY = "mood_lighting_ipaddress"
var PIN_KEY = "mood_lighting_pin"

class Home extends React.Component {
  static navigationOptions = { title: 'Settings' };
  constructor(props) {
    super(props);
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
  handleSave() {
    AsyncStorage.setItem(IP_KEY, this.state.ipaddress);
    AsyncStorage.setItem(PIN_KEY, this.state.pin);
    this.props.navigation.navigate('Home');
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.view}>
          <Form>
            <Item floatingLabel last>
              <Label style={{color:'white'}}>Pin</Label>
              <Input style={{color:'white'}} value={this.state.pin} onChangeText={v => this.setState({pin:v})}/>
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
