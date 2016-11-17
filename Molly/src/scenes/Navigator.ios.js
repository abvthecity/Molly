import React, { Component } from 'react'
import {
  NavigatorIOS,
  View, Text
} from 'react-native'

// import Landing from './Landing'
import Testing from './Testing'

class Navigator extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          title: 'Testing',
          component: Testing,
        }}
        navigationBarHidden={true}
        style={{ flex: 1 }}
      />
    )
  }
}

export default Navigator
