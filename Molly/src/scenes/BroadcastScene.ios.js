import React, { Component, PropTypes } from 'react'
import {
  View, ScrollView,
  Image, Text, Switch,
  TouchableOpacity, TouchableHighlight,
  StyleSheet, AlertIOS, Modal, TextInput,
  NativeModules, NativeEventEmitter
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import { BlurView } from 'react-native-blur'
import Swiper from 'react-native-swiper'

import constants from '../common/constants'
import { get, post } from '../common/fetch'

import BlurNavigator from '../components/BlurNavigator'
import BlurStatusBar from '../components/BlurStatusBar'

import Listitem from '../components/Listitem'
import SongListitem from '../components/SongListitem'
import Card from '../components/Card'
import ChannelCardNowPlayingView from '../components/ChannelCardNowPlayingView'
import HeadingWithAction from '../components/HeadingWithAction'
import Button from '../components/Button'
import Swipeout from '../components/Swipeout'

import SpotifySearchModal from './SpotifySearchModal'

const SpotifyAPI = NativeModules.SpotifyAPI;
const SpotifyAPIEventEmitter = new NativeEventEmitter(SpotifyAPI);

class BroadcastScene extends Component {

  constructor(props) {
    super(props)

    this._addSong =       this._addSong.bind(this)
    this._renderHeader =  this._renderHeader.bind(this)
    this._onMessage =     this._onMessage.bind(this)
    this._updateChannel = this._updateChannel.bind(this)
    this._flipSwitch =    this._flipSwitch.bind(this)
    this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this)
  }

  static propTypes = {
    goBack: PropTypes.func
  }

  state = {
    live:   false, // on/off switch
    width:  375,   // useful for the swipe feature (default: size of iPhone 6)

    hostName:     null,
    channelName:  null,
    serverOffset: 0,
    swiperContext: null,
    swiperIndex: 0,

    // nowPlaying: {
    //   uri: null,
    //   startTime: null,
    //   currentTime: null,
    //   duration: null,
    //   album_cover: null,
    //   song_title: null,
    //   artist_name: null,
    // },
    nowPlaying: null,

    // playingNext: {
    //   uri: null,
    //   startTime: null,
    //   currentTime: null,
    //   duration: null,
    //   album_cover: null,
    //   song_title: null,
    //   artist_name: null,
    // },
    playingNext: null,

    upNext: [], // either Strings or Spotify Track Objects

    searchSpotify: false, // open up the module
  }

  componentWillMount() {
    // add an emit listener
    this.socketId = this.props.socket.addListener(this._onMessage)

    this._setServerOffset()

    // get the channel's info
    this._fetchCurrentInfo()
  }

  componentWillUnmount() {
    this.props.socket.removeListener(this.socketId)
    clearInterval(this.t)
    clearInterval(this.s)
    if (this.serverOffsetInterval) clearInterval(this.serverOffsetInterval)

    SpotifyAPI.setIsPlaying(false, error => {
      if (error) console.log(error)
    })
  }

  _onMessage(e) {
    // console.log(e)
    if (e.emit == 'channel_updated' && e.channel == this.props.clientId) {
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
    if (!this.props.clientId) return;

    try {
      // get the channel's info
      let channelInfo = await get(constants.server + 'channel?id=' + this.props.clientId)
      if ('error' in channelInfo) {
        // channel doesn't exist? That's ok. We'll create a new one
        channelInfo = (await post(constants.server + 'channel', {
          host: this.props.clientId,
          name: this.props.clientId + '\'s Channel',
        })).channel
      }
      // update channel simply updates the state
      this._updateChannel(channelInfo)
    } catch(error) {
      console.error(error)
    }

  }

  async _updateChannel(channelData) {

    // set basic info
    let newState = {
      channelName: channelData.name,
      hostName: channelData.hostId,
      live: channelData.isLive,
      timeStamp: channelData.timeStamp
    }

    // set nowPlaying
    if (channelData.currentTrackURI) {

      // inherit old data
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
          listener_count: 0
        }
      }

      Object.assign(newState.nowPlaying, {
        uri: channelData.currentTrackURI,
        startTime: channelData.currentTrackStartTime,
        currentTime: channelData.currentTrackTime,
        duration: channelData.currentTrackDuration,
        listener_count: channelData.listenerCount,
      })

      SpotifyAPI.playURI(newState.nowPlaying.uri,
        ((new Date()).getTime() - (newState.nowPlaying.startTime - this.state.serverOffset)),
        error => {
          if (error) console.log(error)
          SpotifyAPI.setIsPlaying(true, error => {
            if (error) return console.log(error)
          })
        })

      // update info if necessary
      try {
        console.log("UPDATED")
        let spotifyData = await get(constants.spotify + 'tracks/' + channelData.currentTrackURI.split(':').pop())
        Image.prefetch(spotifyData.album.images[1].url)
        Object.assign(newState.nowPlaying, {
          album_cover: { uri: spotifyData.album.images[1].url },
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

    // get playingNext data
    if (channelData.upNext.length > 0) {
      try {
        let spotifyData = await get(constants.spotify + 'tracks/' + channelData.upNext[0].split(':').pop())
        Image.prefetch(spotifyData.album.images[1].url)
        newState.playingNext = {
          uri: spotifyData.uri,
          startTime: 0,
          currentTime: 0,
          duration: spotifyData.duration_ms,
          album_cover: { uri: spotifyData.album.images[1].url },
          song_title: spotifyData.name,
          artist_name: spotifyData.artists.map(d => d.name).join(', '),
        }
      } catch(error) {
        console.error(error)
      }
    } else newState.playingNext = null

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

    if (this.state.nowPlaying && this.state.swiperIndex !== 0) {
      this.state.swiperContext.scrollBy(-this.state.swiperIndex, false)
      this.setState({ swiperIndex: 0 })
    }

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
      if (this.state.nowPlaying) {
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

  _flipSwitch(value) {
    if (value) {
      this.props.socket.send(JSON.stringify({
        emit: 'startChannel',
        channel: this.props.clientId
      }))
    } else {
      // AlertIOS.alert('End broadcast?', 'Ending this session will kick listeners off. Are you sure?', () => {
        this.props.socket.send(JSON.stringify({
          emit: 'stopChannel',
          channel: this.props.clientId
        }))
      // })
    }
  }

  _renderHeader() {
    let content = <Text style={{ color: 'white', textAlign: 'center', fontWeight: '500', opacity: 0.7, letterSpacing: -0.2}}>OFFLINE</Text>
    if (this.state.live) content = <Text style={{ color: 'white', textAlign: 'center', fontWeight: '800', letterSpacing: -0.2}}>BROADCASTING</Text>

    let renderSwitch = () => (<Switch
      onValueChange={this._flipSwitch}
      value={this.state.live}
      tintColor="rgba(255, 255, 255, 0.35)"/>)

    return (
      <BlurNavigator light={true}
        onLeftButtonPress={this.props.goBack}
        leftButtonTitle="Exit"
        leftButtonDisabled={this.state.live}
        rightContent={renderSwitch}
      >{content}</BlurNavigator>
    )
  }

  _onMomentumScrollEnd(e, state, context) {
    this.setState({
      swiperContext: context,
      swiperIndex: state.index
    })
    if (state.index !== 0) {
      this.props.socket.send(JSON.stringify({ emit: 'skipSongInChannel', channel: this.props.clientId }))
    }
  }

  _addSong(track) {
    this.props.socket.send(JSON.stringify({
      emit: 'addTrackToQueue',
      channel: this.props.clientId,
      track: {
        uri: track.uri,
        duration: track.duration_ms
      }
    }))
  }

  _removeSong(index) {
    let queue = this.state.upNext;
    queue.splice(index, 1)
    console.log(index, queue);
    queue = queue.map(t => ({
      uri: t.uri,
      duration: t.duration_ms
    }))

    this.props.socket.send(JSON.stringify({
      emit: 'updateChannelQueue',
      channel: this.props.clientId,
      queue: queue
    }))
  }

  render() {

    const controls = () => {
      if (this.state.nowPlaying) {

        return (<Swiper
          style={{ overflow: 'visible', marginLeft: constants.unit * 2, marginTop: constants.unit * 3 }}
          loop={false}
          height={-1}
          width={this.state.width - constants.unit * 5}
          showsPagination={false}
          showsButtons={false}
          onMomentumScrollEnd={this._onMomentumScrollEnd}>
          <Card style={{ flex: 1, marginRight: constants.unit * 3 }}>
            <ChannelCardNowPlayingView nowPlaying={this.state.nowPlaying} />
          </Card>
          {(() => {
            if (this.state.playingNext) {
              return (<Card style={{ flex: 1, marginRight: constants.unit * 3 }}>
                <ChannelCardNowPlayingView nowPlaying={this.state.playingNext} />
              </Card>)
            } else {
              return (<View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingHorizontal: constants.unit * 3
              }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', opacity: 0.7 }}>Skip</Text>
              </View>)
            }
          })()}
        </Swiper>)

      }
    }

    return (
      <LinearGradient colors={['#FF6E88', '#BF2993']} {...this.props} style={[{ flex: 1 }, this.props.style]}>
        {this._renderHeader()}

        {/* SPOTIFY MODAL */}
        <SpotifySearchModal
          visible={this.state.searchSpotify}
          cancel={() => this.setState({ searchSpotify: false })}
          addSong={this._addSong} />

        {/* BROADCAST CONTROLLER */}
        <ScrollView style={{ backgroundColor: 'transparent', paddingTop: constants.navpad }}
          contentInset={{ top: 20, bottom: 20 }} contentOffset={{ y: -20 }}
          onLayout={event => {
            let { x, y, width, height } = event.nativeEvent.layout;
            this.setState({ width })
          }}>

          {/* HEADING */}
          <View style={{ margin: constants.unit * 4, marginBottom: 0 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <View>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }} tail="tail" numberOfLines={2}>{this.state.channelName}</Text>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }} tail="tail" numberOfLines={1}>{this.state.hostName}</Text>
              </View>
              <Button tintColor="white">Edit</Button>
            </View>
          </View>

          {/* Swipable now-playing controls */}
          {controls()}

          {/* UP NEXT */}
          <Card style={{ marginHorizontal: constants.unit * 4, marginVertical: constants.unit * 3 }}>
            <Listitem indent={constants.unit * 3} backgroundColor="transparent">
              <HeadingWithAction
                title="Up Next"
                buttonTitle="Add song"
                onButtonPress={() => this.setState({ searchSpotify: true })} />
            </Listitem>
            <View style={{ minHeight: 0, paddingBottom: constants.unit * 6 }}>
              {this.state.upNext.map((track, i) => {
                if (typeof track !== 'string') {
                  let swipeButtons = [{ text: 'Remove', type: 'delete', onPress: () => this._removeSong(i) }]

                  return (<Swipeout key={i}
                      right={swipeButtons}
                      backgroundColor="transparent">
                      <SongListitem
                        backgroundColor="transparent"
                        imageURI={{ uri: track.album.images[1].url }}
                        name={track.name}
                        artists={track.artists.map(d => d.name).join(', ')}
                        albumName={track.album.name}/>
                    </Swipeout>)

                } else {
                  return <Listitem key={i} indent={constants.unit * 3} backgroundColor="transparent"/>
                }
              })}
              {(() => {
                if (this.state.upNext.length === 0) {
                  return (
                    <Listitem indent={constants.unit * 3} backgroundColor="transparent">
                      <Text style={{ color: '#CCC' }}>Add songs to the queue</Text>
                    </Listitem>
                  )
                }
              })()}
            </View>
          </Card>


        </ScrollView>
      </LinearGradient>
    )
  }

}

const styles = StyleSheet.create({
  button: {
    color: '#007AFF',
    fontSize: 17,
    letterSpacing: -0.23,
    fontWeight: '600',
    padding: constants.unit,
    marginRight: -constants.unit
  },
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
  },
})

export default BroadcastScene
