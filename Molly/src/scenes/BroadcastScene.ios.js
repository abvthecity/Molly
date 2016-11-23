import React, { Component, PropTypes } from 'react'
import {
  View, ScrollView,
  Image, Text, Switch,
  TouchableOpacity, TouchableHighlight,
  StyleSheet, AlertIOS, Modal, TextInput
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

class BroadcastScene extends Component {

  constructor(props) {
    super(props)

    this._addSong = this._addSong.bind(this)
    this._renderSwitch =  this._renderSwitch.bind(this)
    this._renderHeader =  this._renderHeader.bind(this)
    this._onMessage =     this._onMessage.bind(this)
    this._updateChannel = this._updateChannel.bind(this)
  }

  static propTypes = {
    goBack: PropTypes.func
  }

  state = {
    live:   false, // on/off switch
    width:  375,   // useful for the swipe feature (default: size of iPhone 6)

    hostName:    null,
    channelName: null,
    nowPlaying:  null,
    playingNext: null,
    upNext:      [],

    searchSpotify: false, // open up the module
  }

  componentWillMount() {
    let _this = this;

    // add an emit listener
    this.props.socket.addListener("broadcast", this._onMessage)

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

  _updateChannel(channelData) {
    let _this = this;
    this.setState({
      channelName: channelData.name,
      hostName: channelData.hostId,
      upNext: channelData.upNext,
      live: channelData.isLive,
    }, () => {
      let ids = this.state.upNext.map(d => d.split(':').pop()).join(',');
      if (ids.length === 0) return
      get(constants.spotify + 'tracks/?ids=' + ids)
        .then(data => {
          let tracksObj = {}
          for (let track of data.tracks) {
            tracksObj[track.uri] = track
            Image.prefetch(track.album.images[0].url)
          }
          return this.state.upNext.map(trackId => tracksObj[trackId])
        }).then(upNext => _this.setState({ upNext }))
        .catch(console.error)
    })
  }

  componentWillUnmount() {
    this.props.socket.removeListener("broadcast")
  }

  _onMessage(e) {
    // console.log(e)
    if (e.emit == 'channel_updated' && e.channel == this.props.clientId) {
      this._updateChannel(e.data)
    }
  }

  _renderSwitch() {
    return (
      <Switch
        onValueChange={value => {
          if (value) {
            this.setState({ live: value })
          } else {
            AlertIOS.alert('End broadcast?', 'Ending this session will kick listeners off. Are you sure?', () => {
              this.setState({ live: value })
            })
          }
        }}
        value={this.state.live}
        tintColor="rgba(255, 255, 255, 0.35)"
      />
    )
  }

  _renderHeader() {
    let content = <Text style={{ color: 'white', textAlign: 'center', fontWeight: '500', opacity: 0.7, letterSpacing: -0.2}}>OFFLINE</Text>
    if (this.state.live) content = <Text style={{ color: 'white', textAlign: 'center', fontWeight: '800', letterSpacing: -0.2}}>BROADCASTING</Text>

    return (
      <BlurNavigator light={true}
        onLeftButtonPress={this.props.goBack}
        leftButtonTitle="Exit"
        leftButtonDisabled={this.state.live}
        rightContent={this._renderSwitch}
      >{content}</BlurNavigator>
    )
  }

  _onMomentumScrollEnd(e, state, context) {

    if (state.index !== 0) {
      context.scrollBy(-state.index, false)

      // skip that fucking song
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

    const header = (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <View>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>{this.state.channelName}</Text>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>{this.state.hostName}</Text>
        </View>
        <Button tintColor="white">Edit</Button>
      </View>
    )

    const controls = () => {
      if (this.state.nowPlaying != null) {
        return (<Swiper
          style={{ overflow: 'visible', marginLeft: constants.unit * 2, marginTop: constants.unit * 3 }}
          loop={false}
          height={118 + constants.unit * 6}
          width={this.state.width - constants.unit * 5}
          showsPagination={false}
          showsButtons={false}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          >

          <Card style={{ flex: 1, marginRight: constants.unit * 3 }}>
            <NowPlayingCardView nowPlaying={this.state.nowPlaying} />
          </Card>

          <Card style={{ flex: 1, marginRight: constants.unit * 3 }}>
            <NowPlayingCardView nowPlaying={this.state.playingNext} />
          </Card>

        </Swiper>)
      }
    }

    return (
      <LinearGradient colors={['#FF6E88', '#BF2993']} {...this.props} style={[{ flex: 1 }, this.props.style]}>
        {this._renderHeader()}

        <SpotifySearchModal
          visible={this.state.searchSpotify}
          cancel={() => this.setState({ searchSpotify: false })}
          addSong={this._addSong} />

        <ScrollView style={{
          backgroundColor: 'transparent',
          paddingTop: constants.navpad
        }}
          contentInset={{ top: 20, bottom: 20 }} contentOffset={{ y: -20 }}
          onLayout={event => {
            let { x, y, width, height } = event.nativeEvent.layout;
            this.setState({ width })
          }}>
          <View style={{ padding: constants.unit * 4 }}>{header}</View>

          {controls()}

          <View style={{ paddingHorizontal: constants.unit * 4 }}>
            <Card style={{ marginBottom: constants.unit * 3 }} shadow={false}>
              <View style={{ padding: constants.unit * 3 }}>
                <HeadingWithAction
                  title="Up Next"
                  buttonTitle="Add song"
                  onButtonPress={() => this.setState({ searchSpotify: true })}
                />
              </View>
              <View>
                {this.state.upNext.map((track, i) => {
                  if (typeof track !== 'string') {
                    let swipeButtons = [
                      {
                        text: 'Remove',
                        type: 'delete',
                        onPress: () => this._removeSong(i)
                      }
                    ]

                    return (
                      <Swipeout key={i}
                        right={swipeButtons}
                        backgroundColor="transparent">
                        <SongListitem
                          backgroundColor="transparent"
                          imageURI={{ uri: track.album.images[1].url }}
                          name={track.name}
                          artists={track.artists.map(d => d.name).join(', ')}
                          albumName={track.album.name}
                        />
                      </Swipeout>
                    )
                  } else {
                    return <Listitem key={i} indent={constants.unit * 4} backgroundColor="transparent"/>
                  }
                })}
              </View>
            </Card>
          </View>


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
