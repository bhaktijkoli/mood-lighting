import React from 'react';
import { Root } from "native-base";
import { StackNavigator } from 'react-navigation';

import Home from './app/components/Home/Home'
import ColorWheel from './app/components/ColorWheel/ColorWheel'
import Settings from './app/components/Settings/Settings'

export default class App extends React.Component {
  async componentWillMount() {
  await Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  });
}
  render() {
    return (
      <Root>
        <AppNavigator/>
      </Root>
    );
  }
}
const AppNavigator = StackNavigator({
  Home: { screen: Home },
  ColorWheel: { screen: ColorWheel },
  Settings: { screen: Settings },
});
