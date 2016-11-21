import React, { PropTypes } from 'react'
import {
  View, Text, Image, ProgressViewIOS,
  StyleSheet
} from 'react-native'

import constants from '../common/constants'

const NowPlayingCardView = props => {

  return (
    <View style={styles.playing}>
      <View style={styles.playing_album_art}>
        <Image style={{ flex: 1 }} source={props.nowPlaying.album_cover} />
      </View>
      <View style={styles.playing_details}>
        <View>
          <Text style={[styles.smallText, { color: '#FF2D55' }]}>NOW PLAYING</Text>
          <Text style={{ fontSize: 18, fontWeight: '800', color: 'black', letterSpacing: -0.5 }}>{props.nowPlaying.song_title}</Text>
          <Text style={{ fontSize: 18, fontWeight: '500', color: '#808080', letterSpacing: -0.5 }}>{props.nowPlaying.artist_name}</Text>
        </View>
        <View style={{ marginTop: -constants.unit * 8 }}>
          <Text style={{ fontSize: 13, fontWeight: '500', color: '#B2B2B2', textAlign: 'right' }}>1:27</Text>
          <ProgressViewIOS
            progress={props.nowPlaying.progress}
            progressTintColor={props.nowPlaying.accent || '#FF2D55'}
            trackTintColor={'rgba(0, 0, 0, 0.15)'}
            style={{ height: 3, borderRadius: 1.5, overflow: 'hidden'}}
          />
        </View>
        <Text style={[styles.smallText, { color: '#808080' }]}>54 LISTENERS</Text>
      </View>
    </View>
  )

}

NowPlayingCardView.propTypes = {
  nowPlaying: PropTypes.shape({
    album_cover: PropTypes.object,
    song_title: PropTypes.string.isRequired,
    artist_name: PropTypes.string.isRequired,
    neutral: PropTypes.string.isRequired,
    accent: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired
  })
}

const styles = StyleSheet.create({
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
  }
})

export default NowPlayingCardView
