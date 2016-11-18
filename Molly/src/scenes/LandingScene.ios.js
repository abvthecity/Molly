import React, { Component, PropTypes } from 'react'
import {
  StatusBar,
  View, Image,
  Text, TouchableHighlight,
  StyleSheet
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import constants from '../common/constants'

// import ChannelsTabBar from './ChannelsTabBar'

class LandingScene extends Component {

  static propTypes = {
    // title: PropTypes.string,
    // navigator: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  }

  render() {
    const introImg = require('../img/landing/vinyl.png')
    const logo = 'Molly'
    const sub = 'Listen together'

    return (
      <LinearGradient {...this.props}
        colors={['white', '#F2F2F2']}
        style={[styles.scene, this.props.style]}>

        <View style={styles.splash}>
          <Image source={introImg} style={styles.splash_vinyl} />
          <View style={{ paddingRight: constants.unit * 4 }}>
            <Text style={{ fontSize: 64, fontWeight: '900' }}>{logo}</Text>
            <Text style={{ fontSize: 18, color: '#808080', marginTop: -constants.unit * 3 }}>{sub}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.content_blurb}>Ever wanted to hear what music your friends are listening to? Now you can in real time.</Text>
          <TouchableHighlight onPress={this.props.login} style={{ borderRadius: 22 }}>
            <View style={styles.login_button}>
              <Text style={styles.login_button_text}>LOGIN WITH SPOTIFY</Text>
            </View>
          </TouchableHighlight>
          <View>
            <Text style={styles.spotify_powered_by}>powered by</Text>
            <Image
              source={require('../img/landing/spotify_logo.png')}
              style={{ tintColor: '#B2B2B2' }} />
          </View>
        </View>

      </LinearGradient>
    )
  }

}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: 'white',
    flex: 1,
  },
  splash: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingTop: constants.unit * 10
  },
  splash_vinyl: {
    width: 256,
    height: 256,
    resizeMode: 'cover',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.35,
    shadowRadius: 44,
    overflow: 'visible',
    marginLeft: -constants.unit * 20
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: constants.unit * 8,
    paddingBottom: constants.unit * 8
  },
  content_blurb: {
    fontSize: 18,
    fontWeight: '400',
    width: 280,
    color: '#808080',
    textAlign: 'center'
  },
  login_button: {
    backgroundColor: '#1DB954',
    width: 256,
    height: 44,
    borderRadius: 22,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    overflow: 'visible',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  login_button_text: {
    flex: 1,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  },
  spotify_powered_by: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B2B2B2',
    textAlign: 'center',
    marginBottom: constants.unit
  }
})

export default LandingScene;
