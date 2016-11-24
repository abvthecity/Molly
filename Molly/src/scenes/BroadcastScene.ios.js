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
import NowPlayingCardView from '../components/NowPlayingCardView'
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
    this.props.socket.addListener("broadcast", this._onMessage)

    // get the channel's info
    this._fetchCurrentInfo()
  }

  _fetchCurrentInfo() {
    let _this = this
    if (!this.props.clientId) return;

    // get the channel's info
    get(constants.server + 'channel?id=' + this.props.clientId)
      .then(res => {
        if ('error' in res) {
          // channel doesn't exist? That's ok. We'll create a new one
          return post(constants.server + 'channel', {
            host: this.props.clientId,
            name: this.props.clientId + '\'s Channel',
          }).then(data => data.channel)
        } else return res
      }).then(this._updateChannel) // update channel simply updates the state
      .catch(console.error);
  }

  async _updateChannel(channelData) {
    let _this = this

    // set basic info
    let newState = {
      channelName: channelData.name,
      hostName: channelData.hostId,
      live: channelData.isLive,
      serverOffset: channelData.serverOffset,
    }

    // set nowPlaying
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
        startTime: channelData.currentTrackStartTime - channelData.serverOffset,
        currentTime: channelData.currentTrackTime,
        duration: channelData.currentTrackDuration
      })

      // update info if necessary
      if (this.state.nowPlaying === null) {
        try {
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

      }
    } else newState.nowPlaying = null

    // get playingNext data
    if (channelData.upNext.length > 0) {
      if (this.state.playingNext === null) {
        try {
          let spotifyData = await get(constants.spotify + 'tracks/' + channelData.upNext[0].split(':').pop())
          Image.prefetch(spotifyData.album.images[1].url)
          newState.playingNext = {
            uri: spotifyData.uri,
            startTime: 0,
            currentTime: 0,
            duration: spotifyData.duration_ms,
            album_cover: { uri: spotifyData.album.images[1].url },
            song_title: null,
            artist_name: null,
          }
        } catch(error) {
          console.error(error)
        }
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
          Image.prefetch(track.album.images[0].url)
        }
        newState.upNext = channelData.upNext.map(trackId => tracksObj[trackId])
      } catch(error) {
        console.error(error)
      }
    } else newState.upNext = []

    this.setState(newState, this._updateTimer)
  }

  componentWillUnmount() {
    this.props.socket.removeListener("broadcast")
  }

  _onMessage(e) {
    // console.log(e)
    if (e.emit == 'channel_updated' && e.channel == this.props.clientId) {
      Object.assign(e.data, { serverOffset: this.state.serverOffset })
      this._updateChannel(e.data)
    }
  }

  _updateTimer() {
    let _this = this;
    clearInterval(this.t)

    if (!this.state.live) return;

    this.t = setInterval(() => {
      // if nothing is playing, don't continue
      if (_this.state.nowPlaying === null) return;

      let nowPlaying = _this.state.nowPlaying;
      let date = new Date();
      nowPlaying.currentTime = date.getTime() - nowPlaying.startTime

      _this.setState({ nowPlaying })

      if (nowPlaying.currentTime >= nowPlaying.duration - 100) {
        _this._fetchCurrentInfo()
      }

    }, 100);
  }

  _flipSwitch(value) {
    if (value) {
      this.props.socket.send(JSON.stringify({
        emit: 'startChannel',
        channel: this.props.clientId
      }))
    } else {
      AlertIOS.alert('End broadcast?', 'Ending this session will kick listeners off. Are you sure?', () => {
        this.props.socket.send(JSON.stringify({
          emit: 'stopChannel',
          channel: this.props.clientId
        }))
      })
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

    if (state.index !== 0) {
      context.scrollBy(-state.index, false)

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

    this.setState({
      searchSpotify: false,
      query: '',
      spotifySearchResults: [],
    })
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
            <NowPlayingCardView nowPlaying={this.state.nowPlaying} />
          </Card>
          {(() => {
            if (this.state.playingNext) {
              return (<Card style={{ flex: 1, marginRight: constants.unit * 3 }}>
                <NowPlayingCardView nowPlaying={this.state.playingNext} />
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
