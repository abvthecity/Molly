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
    favorite: PropTypes.bool,
    shadow: PropTypes.bool,
    border: PropTypes.bool,
    nowPlaying: PropTypes.shape({
      album_cover: PropTypes.object.isRequired,
      song_title: PropTypes.string.isRequired,
      artist_name: PropTypes.string.isRequired,
      neutral: PropTypes.string.isRequired,
      accent: PropTypes.string.isRequired,
      progress: PropTypes.number.isRequired
    })
  }

  static defaultProps = {
    favorite: false,
    shadow: true,
    border: false
  }

  setNativeProps(nativeProps) {
    if (this._root != null) {
      this._root.setNativeProps(nativeProps);
    }
  }

  render() {

    const favorite = () => {
      if (this.props.favorite) {
        return (<Image source={require('../img/icons/heart_filled.png')} style={{
          tintColor: '#FF2D55',
          width: 16,
          height: 16,
          position: 'absolute',
          top: constants.unit * 3,
          right: constants.unit * 3
        }} />)
      }
    }

    return (
      <Card ref={component => this._root = component} {...this.props}
        shadow={this.props.shadow} border={this.props.border} style={[this.props.style]}>

        {favorite()}

        {/* UPPER SIDE */}
        <NowPlayingCardView nowPlaying={this.props.nowPlaying} />
        <View style={styles.separator} />

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
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  lower: {
    padding: constants.unit * 3
  }
})

export default ChannelCard
