import React, { Component, PropTypes } from 'react'
import {
  View, Text, Image,
  StyleSheet, Animated
} from 'react-native'

import constants from '../common/constants'

import CardInfoContent from './CardInfoContent'
import PlayBar from './PlayBar'
import BlurredBackgroundImage from './BlurredBackgroundImage'

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

  render() {

    return(
      <View {...this.props} style={[this.props.style, styles.cardShadow]}>
        <View style={styles.card_wrap}>
          <BlurredBackgroundImage image={this.props.nowPlaying.album_cover}>
            <View style={[styles.card_overlay, { backgroundColor: this.props.nowPlaying.neutral }]}></View>
          </BlurredBackgroundImage>
          <View style={styles.card}>
            <CardInfoContent
              title={this.props.title}
              host={this.props.host}
              distance={this.props.distance}
              live={this.props.live} />
            <PlayBar
              accent={this.props.nowPlaying.accent}
              nowPlaying={this.props.nowPlaying}
            />
          </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  cardShadow: {
    borderRadius: constants.borderRadiusLg + 1,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    backgroundColor: 'white'
  },
  card_wrap: {
    borderRadius: constants.borderRadiusLg,
    overflow: 'hidden',
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
  }
})

export default ChannelCard
