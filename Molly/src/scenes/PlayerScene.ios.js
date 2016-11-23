import React, { Component } from 'react'
import {
  View, ScrollView, Text, TouchableHighlight, TouchableWithoutFeedback,
  ProgressViewIOS, ListView, Image,
  StyleSheet, Modal, Animated, Easing,
  NativeModules, NativeEventEmitter
} from 'react-native'

const SpotifyAPI = NativeModules.SpotifyAPI;
const SpotifyAPIEventEmitter = new NativeEventEmitter(SpotifyAPI);

import LinearGradient from 'react-native-linear-gradient'

import constants from '../common/constants'
import Card from '../components/Card'
import Listitem from '../components/Listitem'
import BlurNavigator from '../components/BlurNavigator'
import BlurStatusBar from '../components/BlurStatusBar'

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

class PlayerScene extends Component {

  constructor(props) {
    super(props)

    this.state = {
      muted: false,
      animatedValue: new Animated.Value(1),

      title: null,
      host: null,
      favorite: false,
      nowPlaying: {
        album_cover: null,
        song_title: null,
        artist_name: null,
        uri: null,
        startTime: 0,
        currentTime: 0,
        duration: 1
      },
      upNext: []
    }

    this.toggleMute = this.toggleMute.bind(this)
    this._updateTimer = this._updateTimer.bind(this)
  }

  componentWillMount() {
    this._fetchCurrentInfo()

    this.props.socket.addListener("player", this._onMessage)
  }

  componentWillUnmount() {
    SpotifyAPI.setIsPlaying(false, error => {
      if (error) console.log(error)
    })

    this.props.socket.removeListener("player")

    // remove timers
    if (this.t) clearInterval(this.t)
  }

  componentWillReceiveProps(newProps) {
    this._fetchCurrentInfo()
  }

  componentWillUpdate(newProps, newState) {
    if (newState.nowPlaying.uri && (this.state.nowPlaying.uri !== newState.nowPlaying.uri || this.state.nowPlaying.startTime != newState.nowPlaying.startTime)) {
      SpotifyAPI.playURI(newState.nowPlaying.uri, newState.nowPlaying.currentTime, error => {
        if (error) console.log(error)
      })
    }
  }

  _onMessage(e) {
    console.log(e)
  }

  _fetchCurrentInfo() {
    let _this = this

    // console.log(this.props.channelId)

    if (!this.props.channelId) return;

    fetch(constants.server + 'channel?id=' + this.props.channelId)
      .then(res => res.json())
      .then(res => {
        let date = new Date();
        let offset = date.getTime() - res.time

        _this.setState({
          title: res.name,
          host: res.id,
          favorite: res.favorite,
          nowPlaying: {
            album_cover: null,
            song_title: null,
            artist_name: null,
            uri: res.currentTrackURI,
            startTime: date.getTime() - res.currentTrackTime - offset,
            currentTime: res.currentTrackTime + offset,
            duration: res.currentTrackDuration
          },
          upNext: res.upNext
        }, _this._updateTimer)

        // fetch current song info
        fetch(constants.spotify + 'tracks/' + res.currentTrackURI.split(':').pop())
          .then(data => data.json())
          .then(data => {
            Image.prefetch(data.album.images[0].url)
            let nowPlaying = this.state.nowPlaying
            Object.assign(nowPlaying, {
              album_cover: { uri: data.album.images[0].url },
              song_title: data.name,
              artist_name: data.artists.map(d => d.name).join(', '),
            })
            return nowPlaying
          })
          .then(nowPlaying => _this.setState({ nowPlaying }))

        // fetch upNext
        fetch(constants.spotify + 'tracks/?ids=' + res.upNext.map(d => d.split(':').pop()).join(','))
          .then(data => data.json())
          .then(data => {
            let tracksObj = {}
            for (let track of data.tracks) {
              tracksObj[track.uri] = track
              Image.prefetch(track.album.images[0].url)
            }
            return this.state.upNext.map(uri => tracksObj[uri].name)
          })
          .then(queue => _this.setState({ upNext: queue }))

      })
      .catch(console.log)
  }

  _updateTimer() {
    let _this = this;
    clearInterval(this.t)

    this.t = setInterval(() => {

      let nowPlaying = _this.state.nowPlaying;
      let date = new Date();
      nowPlaying.currentTime = date.getTime() - nowPlaying.startTime

      _this.setState({ nowPlaying })

      if (nowPlaying.currentTime >= nowPlaying.duration - 100) {
        _this._fetchCurrentInfo()
      }

    }, 100);
  }

  _setPlaying() {
    if (this.state.muted) {
      SpotifyAPI.setIsPlaying(false, error => {
        if (error) return console.log(error)
      })
    } else {
      SpotifyAPI.seekTo(this.state.nowPlaying.currentTime, error => {
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
      inputRange: [0, 1], outputRange: [0, 0.5]
    })
    const shadowRadius = this.state.animatedValue.interpolate({
      inputRange: [0, 1], outputRange: [0, 24]
    })

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
            }}>{this.state.title}</Text>
            <Text style={{
              color: 'white',
              fontSize: 11,
              fontWeight: '500',
              textAlign: 'center'
            }}>{this.state.host}</Text>
          </BlurNavigator>
          <ScrollView style={{ paddingTop: 64 }}>
            <Card shadow={true} style={[{ zIndex: 2}, { flex: 1 }]}>

              <View style={styles.card_object_inner}>
                <View style={{ position: 'absolute', top: 2, left: 0, right: 0 }}>
                  <Text style={{ flex: 1, fontSize: 11, fontWeight: '500', color: '#FF2D55', textAlign: 'center' }}>LIVE</Text>
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
                      <Image source={this.state.nowPlaying.album_cover} style={{ flex: 1, resizeMode: 'cover', borderRadius: constants.borderRadiusMd, overflow: 'hidden'}} />
                    </Animated.View>
                  </View>
                </TouchableWithoutFeedback>

                <View style={{ marginTop: constants.unit * 6 }}>
                  <ProgressViewIOS
                    progress={this.state.nowPlaying.currentTime / this.state.nowPlaying.duration}
                    progressTintColor={'#FF2D55'}
                    trackTintColor={'rgba(0, 0, 0, 0.15)'}
                    style={{ height: 3, borderRadius: 1.5, overflow: 'hidden'}}
                  />
                  <View style={styles.under_bar}>
                    <Text style={styles.under_bar_text}>{millisToMinutesAndSeconds(this.state.nowPlaying.currentTime)}</Text>
                    <Text style={styles.under_bar_text}>-{millisToMinutesAndSeconds(this.state.nowPlaying.duration - this.state.nowPlaying.currentTime)}</Text>
                  </View>
                </View>

                <View style={{ marginVertical: constants.unit * 2 }}>
                  <Text style={{ fontSize: 24, fontWeight: '800', color: 'black', letterSpacing: -1}}>{this.state.nowPlaying.song_title}</Text>
                  <Text style={{ fontSize: 24, fontWeight: '500', color: '#808080', letterSpacing: -1}}>{this.state.nowPlaying.artist_name}</Text>
                </View>
              </View>

              <View style={styles.line}/>

              <View style={{backgroundColor: '#EEEEEE'}}>
                <View style={styles.card_object_inner}>
                  <Text style={{ fontSize: 24, fontWeight: '900' }}>Up Next</Text>
                </View>

                <View>
                  {this.state.upNext.map((item, i) => (
                    <Listitem key={i}
                      indent={constants.unit * 4}
                      backgroundColor="transparent"
                      text={item} />
                  ))}
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
