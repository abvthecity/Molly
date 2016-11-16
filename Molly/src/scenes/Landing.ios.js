import React, { Component, PropTypes } from 'react'
import {
  StatusBar,
  View,
  Text, Button
} from 'react-native'

import ChannelsTabBar from './ChannelsTabBar'

class Landing extends Component {

  _goToChannels = () => {
    this.props.navigator.push({
      title: 'Channels',
      component: ChannelsTabBar
    })
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <Text>Landing!</Text>
        <Text>Landing!</Text>
        <Text>Landing!</Text>
        <Text>Landing!</Text>
        <Text>Landing!</Text>
        <Text>Landing!</Text>
        <Text>Landing!</Text>
        <Text>Landing!</Text>
        <Button
          onPress={this._goToChannels}
          title="Go To Channels"
        />
      </View>
    )
  }

}

Landing.propTypes = {
  title: PropTypes.string,
  navigator: PropTypes.object.isRequired,
}

export default Landing;
