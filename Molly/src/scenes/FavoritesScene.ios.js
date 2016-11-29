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
import { get } from '../common/fetch'

import BlurStatusBar from '../components/BlurStatusBar'
import BlurNavigator from '../components/BlurNavigator'
import FavoritesCard from '../components/FavoritesCard'
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
    this._updateFavorites()

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

  _updateFavorites() {
    // http request
    get(constants.server + 'Bookmarks?clientID=' + this.props.clientId)
      .then(res => {
        newState = []
        for (let favorite of res.favorites) {
          newState.push(favorite.toString());
        }
        this.setState({ cards: newState })
      })
      .catch(console.error)
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
            return (
              <View style={{
                marginBottom: constants.unit * 3,
                paddingHorizontal: constants.unit * 4
              }}>
                <FavoritesCard card={card} />
              </View>
            )
          })}
        </ScrollView>
      </LinearGradient>
    )
  }

}

export default FavoritesScene
