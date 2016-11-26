import React, { PropTypes } from 'react'
import {
  View, Text, Image, ProgressViewIOS,
  StyleSheet
} from 'react-native'

import constants from '../common/constants'

const ChannelCardNowPlayingView = props => {

  if (props.nowPlaying && props.nowPlaying.uri) {
    return (
      <View style={styles.playing}>
        <View style={styles.playing_album_art}>
          <Image style={{ flex: 1 }} source={props.nowPlaying.album_cover} />
        </View>
        <View style={styles.playing_details}>
          <View>
            <Text style={[styles.smallText, { color: '#FF2D55' }]}>NOW PLAYING</Text>
            <Text style={{ fontSize: 18, fontWeight: '800', color: 'black', letterSpacing: -0.5 }} tail="tail" numberOfLines={1}>{props.nowPlaying.song_title}</Text>
            <Text style={{ fontSize: 18, fontWeight: '500', color: '#808080', letterSpacing: -0.5 }} tail="tail" numberOfLines={1}>{props.nowPlaying.artist_name}</Text>
          </View>
          <View style={{ marginTop: -constants.unit * 8 }}>
            <ProgressViewIOS
              progress={props.nowPlaying.currentTime / props.nowPlaying.duration}
              progressTintColor={props.nowPlaying.accent || '#FF2D55'}
              trackTintColor={'rgba(0, 0, 0, 0.15)'}
              style={{ height: 3, borderRadius: 1.5, overflow: 'hidden'}}
            />
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#B2B2B2', textAlign: 'right' }}>
              {/* {props.nowPlaying.duration} */}
              {constants.millisToMinutesAndSeconds(props.nowPlaying.currentTime)}
            </Text>
          </View>
          {/* {(() => {
            if (props.nowPlaying.listener_count) { */}
              <Text style={[styles.smallText, { color: '#808080' }]}>{props.nowPlaying.listener_count} LISTENERS</Text>
            {/* } */}
          {/* })()} */}
        </View>
      </View>
    )
  } else {
    return (
      <View style={[styles.playing, styles.playing_details]}>
        <Text style={[styles.smallText, { color: '#FF2D55' }]}>NOT PLAYING</Text>
      </View>
    )
  }
}

ChannelCardNowPlayingView.propTypes = {
  nowPlaying: PropTypes.shape({
    album_cover: PropTypes.object,
    song_title: PropTypes.string,
    artist_name: PropTypes.string,
    uri: PropTypes.string,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    listener_count: PropTypes.number,
  })
}

ChannelCardNowPlayingView.defaultProps = {
  nowPlaying: {
    album_cover: null,
    song_title: null,
    artist_name: null,
    uri: null,
    currentTime: 0,
    duration: 1,
    listener_count: 0,
  }
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
    overflow: 'hidden',
    marginRight: constants.unit * 2
  },
  playing_details: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  smallText: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: -0.2
  }
})

export default ChannelCardNowPlayingView
