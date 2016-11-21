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

// import BlurStatusBar from '../components/BlurStatusBar'
import BlurNavigator from '../components/BlurNavigator'
import ChannelCard from '../components/ChannelCard'
import Swipeout from '../components/Swipeout'
import Button from '../components/Button'

class FavoritesScene extends Component {

  static propTypes = {
    goBack: PropTypes.func
  }

  state = {
    cards: []
  }

  componentWillMount() {
    this._getChannels()

    // establish a socket here!
    this.props.socket.addListener("favorites", this._onMessage)
  }

  componentWillUnmount() {
    this.props.socket.removeListener("favorites")
  }

  _onMessage() {
    // something happnes here
  }

  _getChannels() {
    let _this = this;

    fetch(constants.server + '/channels?favorites=true')
      .then(res => res.json())
      .then(res => {

        let cards = res.channels.map(d => ({
          title: d.name,
          host: d.id,
          favorite: d.favorite,
          channelId: d.id,
          nowPlaying: {
            uri: d.currentTrackURI,
            currentTime: d.currentTrackTime,
            duration: d.currentTrackDuration
          }
        }))

        // just to get things started, in case spotify is slow
        _this.setState({ cards })

        // grab trackdata from spotify
        let tracks = res.channels.map(d => d.currentTrackURI.split(':').pop())
        return fetch(constants.spotify + 'tracks/?ids=' + tracks.join(','))
          .then(data => data.json())
          .then(data => {
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
                currentTime: card.nowPlaying.currentTime,
                duration: card.nowPlaying.duration
              }
            }))

          })
          .then(cards => _this.setState({ cards }))

      }).catch(console.error)
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

        <ScrollView
          style={{ backgroundColor: 'transparent', flex: 1, paddingTop: constants.navpad }}
          contentInset={{ top: 20, bottom: 20 }} contentOffset={{ y: -20 }}>
          <View style={{ padding: constants.unit * 4 }}>{header}</View>

          {this.state.cards.map((card, i) => {

            let press = e => {
              this.props.openPlayer()
            }

            let swipeButtonComponent = (
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <Button>Save</Button>
              </View>
            )

            let swipeButtons = [
              {
                text: 'Save',
                backgroundColor: 'transparent',
                color: '#007AFF',
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
