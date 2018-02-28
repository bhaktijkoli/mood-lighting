import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './app/components/Home/Home'
import Settings from './app/components/Settings/Settings'

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}
const AppNavigator = StackNavigator({
  Home: { screen: Home },
  Settings: { screen: Settings },
});
