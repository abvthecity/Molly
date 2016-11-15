import React, { Component, PropTypes } from 'react'
import {
  View, Text, Image,
  StyleSheet, Animated
} from 'react-native'

import constants from '../common/constants'

import PlayBar from './PlayBar'

class ChannelCard extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
    live: PropTypes.bool.isRequired,
    nowPlaying: PropTypes.shape({
      album_cover: PropTypes.number.isRequired,
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
          <View style={styles.card_image}>
            <View style={styles.card_image_wrap}>
              <Image source={this.props.nowPlaying.album_cover}
                blurRadius={10}
                style={styles.card_image_img} />
            </View>
          </View>
          <View style={[styles.card_overlay, { backgroundColor: this.props.nowPlaying.netural }]}></View>
          <View style={styles.card}>
            <View style={styles.card_content}>
              <View style={styles.content_heading}>
                <Text style={[styles.heading1, styles.text_shadow]}>{this.props.title}</Text>
                <Text style={[styles.heading2, styles.text_shadow]}>hosted by <Text style={{ fontWeight: 'bold' }}>{this.props.host}</Text></Text>
              </View>
              <View style={styles.content_labels}>
                <Text style={[styles.xs_heading]}>{this.props.distance}</Text>
                {(() => {
                  if (this.props.live) {
                    return (
                      <View style={styles.live_wrap}>
                        <Text style={[styles.xs_heading, styles.live]}>LIVE</Text>
                      </View>
                    )
                  }
                })()}
              </View>
              <View></View>
            </View>
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
  card_image: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  card_image_wrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card_image_img: {
    flex: 1,
    resizeMode: 'cover'
  },
  card_overlay: {
    backgroundColor: 'black',
    opacity: 0.8,
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 3,
    backgroundColor: 'transparent'
  },
  card_content: {
    minHeight: 92.5
  },
  content_heading: {
    padding: constants.unit * 2,
  },
  content_labels: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: constants.unit,
    right: constants.unit
  },
  heading1: {
    color: 'white',
    fontSize: 18
  },
  heading2: {
    color: 'white',
    fontSize: 12
  },
  xs_heading: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'white'
  },
  live_wrap: {
    padding: 1,
    marginLeft: constants.unit,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: constants.borderRadiusSm,
    overflow: 'hidden'
  },
  live: {
    paddingTop: 2.5,
    paddingBottom: 2.5,
    paddingLeft: 3.5,
    paddingRight: 3.5,
    borderRadius: constants.borderRadiusSm,
    backgroundColor: '#C41200',
    overflow: 'hidden'
  },
  text_shadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 2,
    // overflow: 'auto'
  }
})

export default ChannelCard
