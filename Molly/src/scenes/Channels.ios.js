import React, { Component, PropTypes } from 'react'
import {
  ScrollView, View,
  Text, TouchableHighlight
} from 'react-native'

class Channels extends Component {

  render() {
    return (
      <ScrollView>
        <View>
          <Text>Channels!</Text>
          <Text>Channels!</Text>
          <Text>Channels!</Text>
          <Text>Channels!</Text>
          <Text>Channels!</Text>
          <Text>Channels!</Text>
          <Text>Channels!</Text>
          <Text>Channels!</Text>
        </View>
      </ScrollView>
    )
  }

}

Channels.propTypes = {
  title: PropTypes.string,
  navigator: PropTypes.object.isRequired,
}

export default Channels;
