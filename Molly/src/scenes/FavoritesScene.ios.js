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
    API.getFavorites().then(data => {
      _this.setState({
        cards: data
      })
    }).catch(e => console.error(e))
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
                      distance={card.distance}
                      live={card.live}
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
