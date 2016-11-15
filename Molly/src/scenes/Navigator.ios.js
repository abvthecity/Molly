import React, { Component } from 'react'
import {
  NavigatorIOS,
  View, Text
} from 'react-native'

import Landing from './Landing'

class Navigator extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          title: 'Landing',
          component: Landing,
        }}
        navigationBarHidden={true}
        style={{ flex: 1 }}
      />
    )
  }
}

export default Navigator
