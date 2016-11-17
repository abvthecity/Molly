import React, { Component, PropTypes } from 'react'
import {
  View, Text, Image,
  StyleSheet, ProgressViewIOS
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import constants from '../common/constants'

// import CardInfoContent from './CardInfoContent'
// import PlayBar from './PlayBar'
// import BlurredBackgroundImage from './BlurredBackgroundImage'

class ChannelCard extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
    live: PropTypes.bool.isRequired,
    nowPlaying: PropTypes.shape({
      album_cover: PropTypes.object.isRequired,
      song_title: PropTypes.string.isRequired,
      artist_name: PropTypes.string.isRequired,
      neutral: PropTypes.string.isRequired,
      accent: PropTypes.string.isRequired,
      progress: PropTypes.number.isRequired
    })
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {

    if (this.props.live) {

      return (
        <View ref={component => this._root = component} {...this.props}
          style={[styles.card, styles.cardShadow, this.props.style]}>
          <LinearGradient
            colors={['white', '#F2F2F2']}
            style={styles.card_wrap}>

            {/* UPPER SIDE */}
            <View style={styles.playing}>
              <View style={styles.playing_album_art}>
                <Image style={{ flex: 1 }} source={this.props.nowPlaying.album_cover} />
              </View>
              <View style={styles.playing_details}>
                <View>
                  <Text style={[styles.smallText, { color: '#FF2D55' }]}>LIVE • {this.props.distance}</Text>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>{this.props.nowPlaying.song_title}</Text>
                  <Text style={{ fontSize: 18, fontWeight: '500', color: '#808080' }}>{this.props.nowPlaying.artist_name}</Text>
                </View>
                <View style={{ marginTop: -constants.unit * 8 }}>
                  <Text style={{ fontSize: 13, fontWeight: '500', color: '#B2B2B2', textAlign: 'right' }}>1:27</Text>
                  <ProgressViewIOS
                    progress={this.props.nowPlaying.progress}
                    progressTintColor={this.props.nowPlaying.accent || '#FF2D55'}
                    trackTintColor={'#E5E5E5'}
                  />
                </View>
                <Text style={[styles.smallText, { color: '#808080' }]}>54 LISTENERS</Text>
              </View>
            </View>

            <View style={styles.separator} />

            {/* LOWER SIDE */}
            <View style={styles.lower}>
              <View>
                <Text style={{ fontSize: 22, fontWeight: '700', letterSpacing: -0.3 }}>{this.props.title}</Text>
                <Text style={{ fontSize: 14, fontWeight: '500' }}>{this.props.host}</Text>
              </View>
            </View>

          </LinearGradient>
        </View>
      )

    } else {

      return (
        <View ref={component => this._root = component} {...this.props}
          style={[styles.card, styles.cardOffline, this.props.style]}>
          <View style={styles.card_wrap}>

            <View style={styles.lower}>
              <View>
                <Text style={{ fontSize: 22, fontWeight: '700', letterSpacing: -0.3 }}>{this.props.title}</Text>
                <Text style={{ fontSize: 14, fontWeight: '500' }}>{this.props.host}</Text>
              </View>
            </View>

          </View>
        </View>
      )

    }
  }

}

const styles = StyleSheet.create({
  card: {
    borderRadius: constants.borderRadiusLg,
    backgroundColor: 'white',
  },
  cardShadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    overflow: 'visible'
  },
  cardOffline: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BFBFBF'
  },
  card_wrap: {
    borderRadius: constants.borderRadiusLg,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    minHeight: 72,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#BFBFBF'
  },
  playing: {
    padding: constants.unit * 3,
    flex: 1,
    flexDirection: 'row'
  },
  playing_album_art: {
    width: 118,
    height: 118,
    backgroundColor: 'white',
    borderRadius: constants.borderRadiusSm,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden'
  },
  playing_details: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: constants.unit * 2
  },
  smallText: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: -0.2
  },
  lower: {
    padding: constants.unit * 3
  }
  // card_overlay: {
  //   backgroundColor: 'black',
  //   opacity: 0.8,
  //   flex: 1
  // },
  // card: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'space-between',
  //   zIndex: 3,
  //   backgroundColor: 'transparent'
  // }
})

export default ChannelCard
