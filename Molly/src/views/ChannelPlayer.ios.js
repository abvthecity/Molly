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
      <View {...this.props} style={[this.props.style, styles.channel_player ]}>
        <StatusBar barStyle="light-content" />
        <BlurredBackgroundImage image={this.props.nowPlaying.album_cover}>
          {/* <View style={[styles.card_overlay, { backgroundColor: this.props.nowPlaying.neutral }]}></View> */}
          <View style={[styles.card_overlay]}></View>
        </BlurredBackgroundImage>
        <CardInfoContent
          style={styles.card}
          title={this.props.title}
          host={this.props.host}
          distance={this.props.distance}
          live={this.props.live}>
          <View style={styles.album_wrap}>
            <Image source={this.props.nowPlaying.album_cover} style={styles.album_cover} />
          </View>
        </CardInfoContent>
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
    paddingLeft: constants.unit * 2,
    paddingRight: constants.unit * 2
  },
  card_overlay: {
    backgroundColor: 'black',
    opacity: 0.3,
    flex: 1
  },
  card: {
    flex: 1,
    zIndex: 3,
    backgroundColor: 'transparent'
  },
  playbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 4
  },
  album_wrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: constants.unit * 4
  },
  album_cover: {
    resizeMode: 'cover',
    width: 335,
    height: 335,
    borderRadius: constants.borderRadiusLg,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.35)'
  }
})

export default ChannelPlayer
