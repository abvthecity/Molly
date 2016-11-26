import React, { Component } from 'react'
import {
  View, ScrollView, Text, TouchableHighlight, TouchableWithoutFeedback,
  ProgressViewIOS, ListView, Image,
  StyleSheet, Modal, Animated, Easing,
  NativeModules, NativeEventEmitter
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import constants from '../common/constants'
import { get, post } from '../common/fetch'

import BlurNavigator from '../components/BlurNavigator'
import BlurStatusBar from '../components/BlurStatusBar'

import Card from '../components/Card'
import Listitem from '../components/Listitem'
import SongListitem from '../components/SongListitem'

const SpotifyAPI = NativeModules.SpotifyAPI;
const SpotifyAPIEventEmitter = new NativeEventEmitter(SpotifyAPI);

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

class PlayerScene extends Component {

  constructor(props) {
    super(props)

    this.toggleMute = this.toggleMute.bind(this)
    this._updateTimer = this._updateTimer.bind(this)
    this._onMessage = this._onMessage.bind(this)
    this._setServerOffset = this._setServerOffset.bind(this)
    this._fetchCurrentInfo = this._fetchCurrentInfo.bind(this)
    this._updateChannel = this._updateChannel.bind(this)
  }

  state = {
    muted: false,
    animatedValue: new Animated.Value(1),

    title: null,
    host: null,
    favorite: false,
    live: false,
    serverOffset: 0,

    nowPlaying: null,
    // nowPlaying: {
    //   album_cover: null,
    //   song_title: null,
    //   artist_name: null,
    //   uri: null,
    //   currentTime: 0,
    //   duration: 1
    // }
    upNext: [] // of Spotify Track Objects
  }

  componentWillMount() {
    // add socket listener
    this.socketId = this.props.socket.addListener(this._onMessage)
    this.props.socket.send(JSON.stringify({
      emit: 'userJoinedChannel',
      channel: this.props.channelId,
      clientId: this.props.clientId,
    }))

    this._setServerOffset()
    this._fetchCurrentInfo()
  }

  componentWillUnmount() {
    // remove socket listener
    this.props.socket.removeListener(this.socketId)
    this.props.socket.send(JSON.stringify({
      emit: 'userLeftChannel',
      channel: this.props.channelId,
      clientId: this.props.clientId,
    }))
    // remove timers
    if (this.t) clearInterval(this.t)
    if (this.s) clearInterval(this.s)
    if (this.serverOffsetInterval) clearInterval(this.serverOffsetInterval)

    SpotifyAPI.setIsPlaying(false, error => {
      if (error) console.log(error)
    })
  }

  _onMessage(e) {
    if (e.emit == 'channel_updated' && e.channel == this.props.channelId) {
      Object.assign(e.data, { timeStamp: e.timeStamp })
      this._updateChannel(e.data)
    }
  }

  _setServerOffset() {
    // network time protocol implementation
    async function offsetFunc() {
      try {
        let clientTime = (new Date()).getTime()
        let res = await get(constants.server + 'verify?clientTime=' + clientTime)
        let nowTime = (new Date()).getTime()
        let serverClientRequestDiffTime = res.diff
        let serverTime = res.serverTime
        let serverClientResponseDiffTime = nowTime - serverTime
        let responseTime = (serverClientRequestDiffTime - nowTime + clientTime - serverClientResponseDiffTime) / 2
        this.setState({ serverOffset: serverClientResponseDiffTime - responseTime })
      } catch(error) { console.error(error) }
    }
    this.serverOffsetInterval = setInterval(offsetFunc.bind(this), 10000)
  }

  async _fetchCurrentInfo() {
    if (!this.props.channelId) return;

    try {
      // get channel info
      let channelInfo = await get(constants.server + 'channel?id=' + this.props.channelId)
      if ('error' in channelInfo) return
      this._updateChannel(channelInfo)
    } catch (error) { console.error(error) }
  }

  async _updateChannel(channelData) {
    // set basic info
    let newState = {
      channelName: channelData.name,
      hostName: channelData.hostId,
      live: channelData.isLive,
      timeStamp: channelData.timeStamp
    }

    if (channelData.currentTrackURI) {

      newState.nowPlaying = this.state.nowPlaying
      if (newState.nowPlaying === null) {
        newState.nowPlaying = {
          uri: null,
          startTime: null,
          currentTime: null,
          duration: null,
          album_cover: null,
          song_title: null,
          artist_name: null,
        }
      }

      Object.assign(newState.nowPlaying, {
        uri: channelData.currentTrackURI,
        startTime: channelData.currentTrackStartTime,
        currentTime: channelData.currentTrackTime,
        duration: channelData.currentTrackDuration
      })

      SpotifyAPI.playURI(newState.nowPlaying.uri,
        ((new Date()).getTime() - (newState.nowPlaying.startTime - this.state.serverOffset)),
        error => {
          if (error) console.log(error)
          SpotifyAPI.setIsPlaying(!this.state.muted, error => {
            if (error) return console.log(error)
          })
        })

      // update info if necessary
      try {
        let spotifyData = await get(constants.spotify + 'tracks/' + channelData.currentTrackURI.split(':').pop())
        Image.prefetch(spotifyData.album.images[0].url)
        Object.assign(newState.nowPlaying, {
          album_cover: { uri: spotifyData.album.images[0].url },
          song_title: spotifyData.name,
          artist_name: spotifyData.artists.map(d => d.name).join(', '),
        })
      } catch(error) {
        console.error(error)
      }

    } else {
      newState.nowPlaying = null
      SpotifyAPI.setIsPlaying(false, error => {
        if (error) return console.log(error)
      })
    }

    // get upNext track data
    if (channelData.upNext.length > 0) {
      let ids = channelData.upNext.map(d => d.split(':').pop()).join(',');
      try {
        let spotifyData = await get(constants.spotify + 'tracks/?ids=' + ids)
        let tracksObj = {}
        for (let track of spotifyData.tracks) {
          tracksObj[track.uri] = track
          Image.prefetch(track.album.images[1].url)
        }
        newState.upNext = channelData.upNext.map(trackId => tracksObj[trackId])
      } catch(error) {
        console.error(error)
      }
    } else newState.upNext = []

    // update state
    if (newState.timeStamp && newState.timeStamp < this.state.timeStamp) return;
    this.setState(newState, this._updateTimer)

  }

  _updateTimer() {
    let _this = this;
    clearInterval(this.t)
    clearInterval(this.s)

    if (!this.state.live) return;

    this.t = setInterval(() => {
      // if nothing is playing, don't continue
      if (_this.state.nowPlaying === null) return;

      let nowPlaying = _this.state.nowPlaying;
      nowPlaying.currentTime = (new Date()).getTime() - (nowPlaying.startTime - this.state.serverOffset)

      _this.setState({ nowPlaying })

      if (nowPlaying.currentTime >= nowPlaying.duration - 100) {
        _this._fetchCurrentInfo()
      }

    }, 100);

    this.s = setInterval(() => {
      // this is some broken magic shit
      // todo: clean this up
      if (!this.state.muted && this.state.nowPlaying) {
        SpotifyAPI.getCurrentPosition((error, ms) => {
          let diff = ms-((new Date()).getTime() - this.state.nowPlaying.startTime)
          // console.log(diff)
          let myTime = ((new Date()).getTime() - this.state.nowPlaying.startTime)
          if (Math.round(ms) > myTime + 100 || Math.round(ms) < myTime - 100) {
            SpotifyAPI.seekTo((Math.round(ms) - diff) + 380, error => {
              if (error) return console.log(error)
            })
          }
        })
      }
    }, 1000)
  }

  _setPlaying() {
    if (this.state.muted || !this.state.nowPlaying) {
      SpotifyAPI.setIsPlaying(false, error => {
        if (error) return console.log(error)
      })
    } else {
      SpotifyAPI.seekTo((new Date()).getTime() - this.state.nowPlaying.startTime, error => {
        if (error) return console.log(error)
        SpotifyAPI.setIsPlaying(true, error => {
          if (error) return console.log(error)
        })
      })
    }
  }

  toggleMute() {
    this.setState({ muted: !this.state.muted}, () => {
      if (this.state.muted) {
        Animated.timing(this.state.animatedValue,
          { toValue: 0, easing: Easing.elastic(0) }
        ).start()
      } else {
        Animated.spring(this.state.animatedValue,
          { toValue: 1, velocity: 3, tension: 20, friction: 5 }
        ).start()
      }

      this._setPlaying()
    })

  }

  render () {

    const scale = this.state.animatedValue.interpolate({
      inputRange: [0, 1], outputRange: [0.7, 1]
    })
    const shadowOpacity = this.state.animatedValue.interpolate({
      inputRange: [0, 1], outputRange: [0.1, 0.5]
    })
    const shadowRadius = this.state.animatedValue.interpolate({
      inputRange: [0, 1], outputRange: [6, 24]
    })

    const playerState = () => {
      if (this.state.live && this.state.nowPlaying && this.state.nowPlaying.uri) {
        return 'LIVE'
      }
      if (this.state.live) {
        return 'NOT PLAYING'
      }
      return 'OFFLINE'
    }

    const player = () => (
      <View style={styles.card_object_inner}>
        <View style={{ position: 'absolute', top: 2, left: 0, right: 0 }}>
          <Text style={{ flex: 1, fontSize: 11, fontWeight: '500', color: '#FF2D55', textAlign: 'center' }}>
            {playerState()}
          </Text>
        </View>

        <TouchableWithoutFeedback onPress={this.toggleMute}>
          <View style={{ width: 343, height: 343, flex: 1 }}>
            <Animated.View style={{
              flex: 1,
              borderRadius: constants.borderRadiusMd,
              overflow: 'visible',
              transform: [{ scale: scale }],
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: shadowOpacity,
              shadowRadius: shadowRadius,
              backgroundColor: 'white'
            }}>
              <Image source={(this.state.nowPlaying) ? this.state.nowPlaying.album_cover : null}
                style={{
                  flex: 1,
                  resizeMode: 'cover',
                  borderRadius: constants.borderRadiusMd,
                  overflow: 'hidden'
                }} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>

        <View style={{ marginTop: constants.unit * 6 }}>
          <ProgressViewIOS
            progress={(this.state.nowPlaying) ? this.state.nowPlaying.currentTime / this.state.nowPlaying.duration : 0}
            progressTintColor={'#FF2D55'}
            trackTintColor={'rgba(0, 0, 0, 0.15)'}
            style={{ height: 3, borderRadius: 1.5, overflow: 'hidden'}}
          />
          <View style={styles.under_bar}>
            <Text style={styles.under_bar_text}>{(this.state.nowPlaying) ? millisToMinutesAndSeconds(this.state.nowPlaying.currentTime) : null}</Text>
            <Text style={styles.under_bar_text}>-{(this.state.nowPlaying) ? millisToMinutesAndSeconds(this.state.nowPlaying.duration - this.state.nowPlaying.currentTime): null}</Text>
          </View>
        </View>

        <View style={{ marginVertical: constants.unit * 2 }}>
          <Text style={{ fontSize: 24, fontWeight: '800', color: 'black', letterSpacing: -1}}>{(this.state.nowPlaying) ? this.state.nowPlaying.song_title : null}</Text>
          <Text style={{ fontSize: 24, fontWeight: '500', color: '#808080', letterSpacing: -1}}>{(this.state.nowPlaying) ? this.state.nowPlaying.artist_name : null}</Text>
        </View>
      </View>
    )

    return (
      // <LinearGradient colors={['white', '#F0F0F0']} style={{ flex: 1 }} {...this.props}>
      // <Modal {...this.props} transparent={false} supportedOrientations={['portrait']} animationType={'slide'}>
        <View {...this.props} style={[{ flex: 1, backgroundColor: 'black' }, this.props.style]}>

          <BlurNavigator
            light={true}
            dark={true}
            onLeftButtonPress={this.props.goBack}
            leftButtonTitle="Close">
            <Text style={{
              color: 'white',
              fontSize: 20,
              fontWeight: '900',
              textAlign: 'center'
            }} tail="tail" numberOfLines={1}>{this.state.channelName}</Text>
            <Text style={{
              color: 'white',
              fontSize: 11,
              fontWeight: '500',
              textAlign: 'center'
            }} tail="tail" numberOfLines={1}>{this.state.hostName}</Text>
          </BlurNavigator>

          <ScrollView style={{ paddingTop: 64 }}>
            <Card shadow={true} style={[{ zIndex: 2}, { flex: 1 }]}>
              {player()}
              <View style={styles.line}/>
              <View style={{backgroundColor: '#EEEEEE'}}>
                <View style={styles.card_object_inner}>
                  <Text style={{ fontSize: 24, fontWeight: '900' }}>Up Next</Text>
                </View>
                <View>
                  {this.state.upNext.map((track, i) => {
                    if (typeof track !== 'string') {
                      return <SongListitem key={i}
                        backgroundColor="transparent"
                        imageURI={{ uri: track.album.images[1].url }}
                        name={track.name}
                        artists={track.artists.map(d => d.name).join(', ')}
                        albumName={track.album.name}/>

                    } else {
                      return <Listitem key={i} indent={constants.unit * 3} backgroundColor="transparent"/>
                    }
                  })}
                </View>
                <View style={styles.card_object_inner} />
              </View>
            </Card>
          </ScrollView>
        </View>
      // </Modal>
      // </LinearGradient>
    )
  }

}

const styles = StyleSheet.create({
  card_object: {
    // marginHorizontal: constants.unit * 2,
    // marginBottom: constants.unit * 3
  },
  card_object_inner: {
    padding: constants.unit * 4
  },
  under_bar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: constants.unit
  },
  under_bar_text: {
    fontSize: 13,
    fontWeight: '500',
    color: '#88888D',
    letterSpacing: 0.4
  },
  list: {
    marginTop: constants.unit * 2,
  },
  line: {
    backgroundColor: '#bbbbbb',
    height: StyleSheet.hairlineWidth,
  },
  row: {
    justifyContent: 'center',
    paddingHorizontal: constants.unit * 4,
    paddingVertical: constants.unit * 4,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
    marginLeft: constants.unit * 4
  },
  rowNote: {
    fontSize: 17,
  },
  rowText: {
    fontSize: 17,
    fontWeight: '500',
  },
})

export default PlayerScene
