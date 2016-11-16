import React, { Component, PropTypes } from 'react'
import {
  View, Text, Image,
  StyleSheet, ProgressViewIOS
} from 'react-native'

import constants from '../common/constants'

import LinearGradient from 'react-native-linear-gradient'

class PlayBar extends Component {

  static propTypes = {
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
      <View style={this.props.style}>
        {/* PROGRESS BAR */}
        <View style={styles.progress_bar}>
          <ProgressViewIOS
            progress={this.props.nowPlaying.progress}
            progressTintColor={this.props.nowPlaying.accent}
          />
        </View>

        {/* BOUNDING BOX FOR PLAYER BAR */}
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
          style={styles.bounding_box}>
          <View style={styles.now_playing}>
            <Image source={this.props.nowPlaying.album_cover}
              style={styles.album_art} />
            <View style={styles.barContent}>
              <Text style={styles.xs_heading}>NOW PLAYING</Text>
              <Text>{this.props.nowPlaying.song_title}</Text>
              <Text>{this.props.nowPlaying.artist_name}</Text>
            </View>
          </View>
          <View style={styles.up_next}>
            <View>
              <Text style={styles.xs_heading}>UP NEXT</Text>
            </View>
            <View style={styles.next_album_group}>
              <Image source={this.props.nowPlaying.album_cover}
                style={[
                  styles.next_album,
                  styles.next_album_major,
                  { zIndex: 3, opacity: 1 }
                ]} />
              <Image source={this.props.nowPlaying.album_cover}
                style={[
                  styles.next_album,
                  styles.next_album_minor,
                  { zIndex: 2, opacity: 0.5 }
                ]} />
              <Image source={this.props.nowPlaying.album_cover}
                style={[
                  styles.next_album,
                  styles.next_album_minor,
                  { zIndex: 1, opacity: 0.25 }
                ]} />
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  progress_bar: {
    height: 2,
    paddingTop: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  bounding_box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  now_playing: {
    margin: constants.unit,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  up_next: {
    margin: constants.unit,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    alignItems: 'flex-end'
  },
  album_art: {
    resizeMode: 'cover',
    width: 46,
    height: 46,
    backgroundColor: 'white',
    borderRadius: constants.borderRadiusSm,
    overflow: 'hidden',
    position: 'relative'
  },
  barContent: {
    marginLeft: constants.unit
  },
  xs_heading: {
    fontSize: 8,
    letterSpacing: 1,
    fontWeight: 'bold'
  },
  next_album_group: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  next_album: {
    backgroundColor: 'white',
    resizeMode: 'cover',
    borderRadius: constants.borderRadiusSm,
    overflow: 'hidden'
  },
  next_album_major: {
    width: 26,
    height: 26
  },
  next_album_minor: {
    width: 24,
    height: 24,
    marginLeft: -18,
    opacity: 0.8
  },
  next_album_overlay: {
    flex: 1,
    backgroundColor: 'white',
  }
})

export default PlayBar
