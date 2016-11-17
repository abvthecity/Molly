import React, { Component, PropTypes } from 'react'
import {
  StatusBar,
  View, Image,
  Text, TouchableHighlight,
  StyleSheet
} from 'react-native'

import constants from '../common/constants'

// import ChannelsTabBar from './ChannelsTabBar'

class Landing extends Component {

  static propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object.isRequired,
  }

  _goToChannels = () => {
    // this.props.navigator.push({
    //   title: 'Channels',
    //   component: ChannelsTabBar
    // })
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <StatusBar barStyle="light-content" />
        <Image source={require('../img/landing/vinyl.png')} style={styles.vinyl} />

        <View style={[styles.heading_wrap]}>
          <Text style={[styles.white_text, styles.text_shadow, styles.heading1]}>Molly</Text>
          <Text style={[styles.white_text, styles.text_shadow, styles.heading2]}>Music, syncronized.</Text>
        </View>

        <TouchableHighlight onPress={this._goToChannels} style={{ borderRadius: 22 }}>
          <View style={styles.green_button}>
            <Text style={[styles.green_button_text, styles.white_text]}>LOGIN WITH SPOTIFY</Text>
          </View>
        </TouchableHighlight>

        <View style={styles.attribution}>
          <Text style={[styles.attr_text, styles.white_text]}>powered by</Text>
          <Image source={require('../img/landing/spotify_logo.png')} />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#121212',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vinyl: {
    width: 375,
    height: 200,
    marginTop: 120,
    resizeMode: 'cover',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 100,
    overflow: 'visible'
  },
  green_button: {
    backgroundColor: '#1DB954',
    height: 44,
    width: 256,
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  green_button_text: {
    fontWeight: 'bold',
    fontSize: 18
  },
  attribution: {
    marginBottom: constants.unit * 6
  },
  attr_text: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: constants.unit * 2
  },
  white_text: {
    color: 'white',
    textAlign: 'center'
  },
  text_shadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
  },
  heading_wrap: {
    backgroundColor: 'transparent',
  },
  heading1: {
    fontSize: 48,
    fontWeight: 'bold',
    margin: constants.unit
  },
  heading2: {
    fontSize: 18,
    margin: constants.unit
  }
})

export default Landing;
