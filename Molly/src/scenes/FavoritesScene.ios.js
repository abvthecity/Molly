import React, { Component, PropTypes } from 'react'
import {
  View, ScrollView,
  Image, Text,
  TouchableOpacity, TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import { BlurView, VibrancyView } from 'react-native-blur'

import constants from '../common/constants'
import API from '../common/API'

import BlurStatusBar from '../components/BlurStatusBar'
import BlurNavigator from '../components/BlurNavigator'
import ChannelCard from '../components/ChannelCard'
import Swipeout from '../components/Swipeout'
import Button from '../components/Button'

class FavoritesScene extends Component {

  constructor(props) {
    super(props);
    this.socketId = null
  }

  static propTypes = {
    goBack: PropTypes.func
  }

  state = {
    cards: []
  }

  componentWillMount() {
    this._getChannels()
    this._updateTimer()

    // establish a socket here!
    this.socketId = this.props.socket.addListener(this._onMessage)
  }

  componentWillUnmount() {
    this.props.socket.removeListener(this.socketId)
    clearInterval(this.t)
  }

  _onMessage() {
    // something happnes here
  }

  _getChannels() {
    let _this = this;

    /*
      {channels: [{
        id: string
        name: string,
        favorite: bool,
        currentTrackURI: string,
        currentTrackTime: number,
        currentTrackDuration: number
      }]}
    */

    fetch(constants.server + '/channels')
      .then(res => res.json())
      .then(res => {

        // console.log(res);

        let date = new Date();

        let cards = res.channels.map(d => ({
          title: d.name,
          host: d.hostId,
          favorite: d.favorite,
          channelId: d.id,
          nowPlaying: {
            uri: d.currentTrackURI,
            startTime: date.getTime() - d.currentTrackTime,
            currentTime: d.currentTrackTime,
            duration: d.currentTrackDuration
          }
        }))

        // just to get things started, in case spotify is slow
        _this.setState({ cards })

        if (res.channels.length == 0) {
          return cards;
        }

        // grab trackdata from spotify
        let tracks = res.channels.filter(d => d.currentTrackURI).map(d => d.currentTrackURI.split(':').pop())
        return fetch(constants.spotify + 'tracks/?ids=' + tracks.join(','))
          .then(data => data.json())
          .then(data => {
            if ('error' in data) return cards

            let tracksObj = {}
            for (let track of data.tracks) {
              tracksObj[track.uri] = track
              Image.prefetch(track.album.images[0].url)
            }

            return cards.map(card => ({
              title: card.title,
              host: card.host,
              favorite: card.favorite,
              channelId: card.host,
              nowPlaying: {
                album_cover: { uri: tracksObj[card.nowPlaying.uri].album.images[0].url },
                song_title: tracksObj[card.nowPlaying.uri].name,
                artist_name: tracksObj[card.nowPlaying.uri].artists.map(d => d.name).join(', '),
                uri: card.nowPlaying.uri,
                startTime: card.nowPlaying.startTime,
                currentTime: card.nowPlaying.currentTime,
                duration: card.nowPlaying.duration
              }
            }))

          })
          .then(cards => _this.setState({ cards }))

      }).catch(console.error)
  }

  _updateTimer() {
    let _this = this;
    clearInterval(this.t)

    this.t = setInterval(() => {
      let cards = _this.state.cards.map(card => {
        let newCard = card;
        let date = new Date();
        newCard.nowPlaying.currentTime = date.getTime() - newCard.nowPlaying.startTime;
        return newCard;
      })

      _this.setState({ cards })
    }, 100);
  }

  render() {
    const header = (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Text style={{ color: 'white', fontSize: 40, fontWeight: '300' }}>My <Text style={{fontWeight: '900'}}>Favorites</Text></Text>
      </View>
    )

    return (
      <LinearGradient colors={['#FFA832', '#FF5F33']} {...this.props} style={[{ flex: 1 }, this.props.style]}>
        <BlurNavigator light={true} onLeftButtonPress={this.props.goBack} leftButtonTitle="Explore"/>
        {/* <BlurStatusBar light={true} /> */}

        <ScrollView
          style={{ backgroundColor: 'transparent', flex: 1, paddingTop: constants.navpad }}
          contentInset={{ top: 20, bottom: 20 }} contentOffset={{ y: -20 }}>

          {/* <View style={{ paddingHorizontal: 10, paddingTop: constants.unit * 4 }}>
            <Button onPress={this.props.goBack} textStyle={{ textAlign: 'left' }} tintColor="white">Explore</Button>
          </View> */}
          <View style={{ padding: constants.unit * 4}}>
            {header}
          </View>

          {this.state.cards.map((card, i) => {

            let press = e => {
              this.props.openPlayer(card.channelId)
            }

            let swipeButtonComponent = (
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <Button>Unsave</Button>
              </View>
            )

            let swipeButtons = [
              {
                text: 'Unsave',
                backgroundColor: 'transparent',
                color: 'white',
                component: swipeButtonComponent
              }
            ]

            return (
              <View key={i}
                style={{
                  marginBottom: constants.unit * 3,
                  paddingHorizontal: constants.unit * 4
                }}>
                <Swipeout
                  right={swipeButtons}
                  style={{ overflow: 'visible' }}
                  backgroundColor="transparent">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={press}
                    style={{ overflow: 'visible' }} >
                    <ChannelCard
                      title={card.title}
                      host={card.host}
                      favorite={card.favorite}
                      nowPlaying={card.nowPlaying}
                    />
                  </TouchableOpacity>
                </Swipeout>
              </View>
            )
          })}

        </ScrollView>
      </LinearGradient>
    )
  }

}

export default FavoritesScene
