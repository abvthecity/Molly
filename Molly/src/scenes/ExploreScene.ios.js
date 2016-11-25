import React, { Component } from 'react'
import {
  View, ScrollView, ListView,
  Image, Text,
  TouchableOpacity, TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import constants from '../common/constants'
import { get, post } from '../common/fetch'

import BlurStatusBar from '../components/BlurStatusBar'
import ChannelCard from '../components/ChannelCard'
import HeadingWithAction from '../components/HeadingWithAction'
import Swipeout from '../components/Swipeout'
import Button from '../components/Button'

class ExploreScene extends Component {

  constructor(props) {
    super(props)
    this._onMessage = this._onMessage.bind(this)
  }

  state = {
    browseTitle: 'Explore',
    name: null,
    cards: []
  }

  componentWillMount() {
    get(constants.spotify + 'users/' + this.props.clientId)
      .then(res => this.setState({ name: res.display_name }))
      .catch(console.error)

    this._getChannels()

    // establish a socket here!
    this.socketId = this.props.socket.addListener(this._onMessage)
  }

  componentWillUnmount() {
    this.props.socket.removeListener(this.socketId)
    clearInterval(this.t)
  }

  _onMessage(e) {
    if (e.emit == 'channels_list_updated') {
      this._getChannels()
    }
  }

  async _getChannels() {
    try {
      let cards = (await get(constants.server + '/channels')).channels

      this.setState({ cards })
    } catch(error) {
      console.error(error)
    }
  }


  render() {

    const header = (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Text style={{ fontSize: 40, fontWeight: '900' }}>Molly</Text>
        <Button textStyle={{ textAlign: 'right' }} onPress={this.props.logout}>{this.state.name || this.props.clientId}</Button>
      </View>
    )

    const favoritesBlock = (<LinearGradient
      colors={['#FFA832', '#FF5F33']} style={styles.colorBlock}>
      <Text style={{ color: 'white', fontSize: 26 }}>My</Text>
      <Text style={{ color: 'white', fontSize: 26, fontWeight: '900' }}>Favorites</Text>
      <Image source={require('../img/icons/heart.png')} style={{
        tintColor: 'white',
        width: 24,
        height: 24,
        position: 'absolute',
        opacity: 0.5,
        bottom: constants.unit * 3,
        left: constants.unit * 3
      }} />
    </LinearGradient>)

    const liveBlock = (<LinearGradient
      colors={['#FF6E88', '#BF2993']} style={styles.colorBlock}>
      <Text style={{ color: 'white', fontSize: 26 }}>Go <Text style={{ fontWeight: '900' }}>LIVE</Text></Text>
      <Image source={require('../img/icons/radio.png')} style={{
        tintColor: 'white',
        width: 24,
        height: 24,
        position: 'absolute',
        opacity: 0.5,
        bottom: constants.unit * 3,
        left: constants.unit * 3
      }} />
    </LinearGradient>)

    return (
      <View {...this.props} style={{ flex: 1 }}>
        <BlurStatusBar light={false} />
        <ScrollView style={{ flex: 1 }} canCancelContentTouches={true} contentInset={{ top: 20, bottom: 20 }} contentOffset={{ y: -20 }}>

          {/* SECTION 1 */}
          <LinearGradient colors={['white', '#F0F0F0']} style={{ backgroundColor: 'transparent', padding: constants.unit * 4 }}>
            {header}
            <View style={styles.blocks_wrap}>
              <TouchableHighlight onPress={this.props.openFavorites} style={[styles.colorBlockWrap, { marginRight: 2.5 }]}>{favoritesBlock}</TouchableHighlight>
              <TouchableHighlight onPress={this.props.openLive} style={[styles.colorBlockWrap, { marginLeft: 2.5 }]}>{liveBlock}</TouchableHighlight>
            </View>
          </LinearGradient>

          {/* SECTION 2 */}
          <View style={{ padding: constants.unit * 4, paddingBottom: 0 }}>
            <HeadingWithAction title={this.state.browseTitle} style={{ marginBottom: constants.unit * 2 }} />
          </View>

          {this.state.cards.map((card, i) => {

            let press = e => {
              this.props.openPlayer(card)
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
                    <ChannelCard socket={this.props.socket} id={card} border={true} />
                  </TouchableOpacity>
                </Swipeout>
              </View>
            )
          })}

        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  colorBlockWrap: {
    flex: 1,
    borderRadius: constants.borderRadiusSm,
    overflow: 'hidden'
  },
  colorBlock: {
    flex: 1,
    padding: constants.unit * 3,
    borderRadius: constants.borderRadiusSm,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'transparent'
  },
  button: {
    color: '#007AFF',
    fontSize: 17,
    letterSpacing: -0.23,
    fontWeight: '600',
    padding: constants.unit,
    marginRight: -constants.unit
  },
  blocks_wrap: {
    height: 169,
    flex: 1,
    flexDirection: 'row',
    marginTop: constants.unit * 2,
    marginBottom: constants.unit * 2
  }
})

export default ExploreScene
