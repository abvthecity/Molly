import React, { Component } from 'react'
import {
  AppRegistry
} from 'react-native'

import Router from './src/scenes/Router'

class Molly extends Component {
  render() {
    return <Router />
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

export default Molly

AppRegistry.registerComponent('Molly', () => Molly)
