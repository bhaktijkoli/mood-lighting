import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ColorWheel } from 'react-native-color-wheel';

export default class App extends React.Component {
  handleChange(color) {

  }
  render() {
    return (
      <View style={styles.container}>
        <ColorWheel
          initialColor="#ee0000"
          onColorChange={this.handleChange.bind(this)}
          style={{width: Dimensions.get('window').width}}
          thumbStyle={{ height: 30, width: 30, borderRadius: 30}} />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eee',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
