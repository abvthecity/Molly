import React, { Component } from 'react'
import {
  View, Text, Image,
  StyleSheet
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

class PlayBar extends Component {

  render() {
    return (
      <View style={this.props.style}>
        {/* TOOD: PROGRESS BAR */}
        <View style={styles.progress_bar}>
          <View style={[styles.progress_track, { backgroundColor: this.props.accent }]} />
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
              <Text>Lost in the World</Text>
              <Text>Kanye West</Text>
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

const borderRadiusSm = 4
const borderRadiusLg = 5
const unit = 5

const styles = StyleSheet.create({
  progress_bar: {
    height: 2,
    paddingTop: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  progress_track: {
    height: 1.5,
    backgroundColor: 'white',
    width: 100
  },
  bounding_box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  now_playing: {
    margin: unit,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  up_next: {
    margin: unit,
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
    borderRadius: borderRadiusSm,
    overflow: 'hidden',
    position: 'relative'
  },
  barContent: {
    marginLeft: unit
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
    borderRadius: borderRadiusSm,
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
