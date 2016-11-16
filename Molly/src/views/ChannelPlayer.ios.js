import React, { Component, PropTypes } from 'react'
import {
  View, Image,
  StyleSheet,
  StatusBar
} from 'react-native'

import constants from '../common/constants'

import CardInfoContent from '../components/CardInfoContent'
import PlayBar from '../components/PlayBar'
import BlurredBackgroundImage from '../components/BlurredBackgroundImage'

class ChannelPlayer extends Component {

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

  render() {
    return (
      <View {...this.props} style={[this.props.style, styles.channel_player]}>
        <StatusBar barStyle="light-content" />
        <BlurredBackgroundImage image={this.props.nowPlaying.album_cover}>
          <View style={[styles.card_overlay, { backgroundColor: this.props.nowPlaying.neutral }]}></View>
        </BlurredBackgroundImage>
        <View style={styles.card}>
          <CardInfoContent
            title={this.props.title}
            host={this.props.host}
            distance={this.props.distance}
            live={this.props.live} />
        </View>
        <PlayBar
          accent={this.props.nowPlaying.accent}
          nowPlaying={this.props.nowPlaying}
          style={styles.playbar}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  channel_player: {
    flex: 1,
    padding: constants.unit * 2,
    paddingTop: 22
  },
  card_overlay: {
    backgroundColor: 'black',
    opacity: 0.8,
    flex: 1
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 3,
    backgroundColor: 'transparent'
  },
  playbar: {
    position: 'absolute',
    bottom: 49,
    left: 0,
    right: 0,
    zIndex: 4
  }
})

export default ChannelPlayer
