import React, { Component, PropTypes } from 'react'
import {
  View, Text, Image,
  StyleSheet, ProgressViewIOS
} from 'react-native'

import constants from '../common/constants'
import { get, post } from '../common/fetch'
import Card from './Card'
import ChannelCardNowPlayingView from './ChannelCardNowPlayingView'

class ChannelCard extends Component {

  constructor(props) {
    super(props)
    this._onMessage = this._onMessage.bind(this)
    this._setServerOffset = this._setServerOffset.bind(this)
    this._fetchCurrentInfo = this._fetchCurrentInfo.bind(this)
    this._updateChannel = this._updateChannel.bind(this)
    this._updateTimer = this._updateTimer.bind(this)
  }

  state = {
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
    timeStamp: 0,
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    shadow: PropTypes.bool,
    border: PropTypes.bool,
  }

  static defaultProps = {
    shadow: true,
    border: false,
  }

  setNativeProps(nativeProps) {
    if (this._root != null) {
      this._root.setNativeProps(nativeProps);
    }
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
  }

  _onMessage(e) {
    // console.log(e)
    if (e.emit == 'channel_updated' && e.channel == this.props.id) {
      Object.assign(e.data, { timeStamp: e.timeStamp })
      this._updateChannel(e.data)
    }
  }

  async _setServerOffset() {
    // network time protocol implementation
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

  async _fetchCurrentInfo() {
    if (!this.props.id) return;

    try {
      // get the channel's info
      let channelInfo = await get(constants.server + 'channel?id=' + this.props.id)
      if ('error' in channelInfo) return // if channel doesn't exist, don't do anything
      // update channel simply updates the state
      this._updateChannel(channelInfo)
    } catch(error) { console.error(error) }

  }

  async _updateChannel(channelData) {

    // set basic info
    let newState = {
      title: channelData.name,
      host: channelData.hostId,
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
        }
      }

      Object.assign(newState.nowPlaying, {
        uri: channelData.currentTrackURI,
        startTime: channelData.currentTrackStartTime - this.state.serverOffset,
        currentTime: channelData.currentTrackTime,
        duration: channelData.currentTrackDuration
      })

      // update info if necessary
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
    } else newState.nowPlaying = null

    if (newState.timeStamp && newState.timeStamp < this.state.timeStamp) return;
    this.setState(newState, this._updateTimer)

  }

  _updateTimer() {
    let _this = this;
    clearInterval(this.t)

    if (!this.state.live) return;

    this.t = setInterval(() => {
      // if nothing is playing, don't continue
      if (_this.state.nowPlaying === null) return;

      let nowPlaying = _this.state.nowPlaying;
      nowPlaying.currentTime = (new Date()).getTime() - nowPlaying.startTime

      _this.setState({ nowPlaying })

      if (nowPlaying.currentTime >= nowPlaying.duration - 100) {
        _this._fetchCurrentInfo()
      }

    }, 200);
  }

  render() {

    const favorite = () => {
      if (this.state.favorite) {
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
        <ChannelCardNowPlayingView nowPlaying={this.state.nowPlaying} />
        <View style={styles.separator} />

        {/* LOWER SIDE */}
        <View style={styles.lower}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: '700', letterSpacing: -0.3 }} tail="tail" numberOfLines={2}>{this.state.title}</Text>
            <Text style={{ fontSize: 14, fontWeight: '500' }} tail="tail" numberOfLines={1}>{this.state.host}</Text>
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
