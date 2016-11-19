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

import BlurNavigator from '../components/BlurNavigator'
import ChannelCard from '../components/ChannelCard'
import Swipeout from '../components/Swipeout'

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
        <ScrollView style={{ backgroundColor: 'transparent', flex: 1, paddingTop: constants.navpad + 0 }}>
          <View style={{ padding: constants.unit * 4 }}>{header}</View>

          {this.state.cards.map((card, i) => {

            let press = () => {
              this.props.openPlayer()
            }

            let swipeButtonComponent = (
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <TouchableOpacity
                  hitSlop={{ left: 16, top: 16, bottom: 16, right: 16 }}
                  style={{
                    // borderRadius: constants.borderRadiusSm,
                    // backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    padding: constants.unit,
                    marginLeft: constants.unit,
                  }}>
                  <Text style={{
                    textAlign: 'center',
                    color: 'white'
                  }}>Unsave</Text>
                </TouchableOpacity>
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
                    key={i}
                    activeOpacity={0.7}
                    onPress={press}
                    style={{ overflow: 'visible' }}
                    disabled={!card.live}>
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
