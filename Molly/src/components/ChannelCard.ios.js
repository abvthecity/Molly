import React, { Component, PropTypes } from 'react'
import {
  View, Text, Image,
  StyleSheet, ProgressViewIOS
} from 'react-native'

import constants from '../common/constants'
import Card from './Card'
import NowPlayingCardView from './NowPlayingCardView'

class ChannelCard extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
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
    if (this._root != null) {
      this._root.setNativeProps(nativeProps);
    }
  }

  render() {

    const upper = () => {
      if (this.props.live) {
        return <NowPlayingCardView nowPlaying={this.props.nowPlaying} />
      }
    }

    const separatorIfUpper = () => {
      if (this.props.live) {
        return <View style={styles.separator} />
      }
    }

    return (
      <Card ref={component => this._root = component} {...this.props}
        shadow={this.props.live} style={[{
          zIndex: this.props.live ? 1 : 0,
          backgroundColor: this.props.live ? 'white' : 'rgba(255, 255, 255, 0.65)'
        }, this.props.style]}>

        {/* UPPER SIDE */}
        {upper()}
        {separatorIfUpper()}

        {/* LOWER SIDE */}
        <View style={styles.lower}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: '700', letterSpacing: -0.3 }}>{this.props.title}</Text>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>{this.props.host}</Text>
          </View>
        </View>

      </Card>
    )

  }

}

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#BFBFBF'
  },
  lower: {
    padding: constants.unit * 3
  }
})

export default ChannelCard
