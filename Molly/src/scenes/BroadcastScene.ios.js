import React, { Component, PropTypes } from 'react'
import {
  View, ScrollView,
  Image, Text, Switch,
  TouchableOpacity, TouchableHighlight,
  StyleSheet, AlertIOS
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import { BlurView, VibrancyView } from 'react-native-blur'
import Swiper from 'react-native-swiper'

import constants from '../common/constants'
import BlurNavigator from '../components/BlurNavigator'

import Card from '../components/Card'
import NowPlayingCardView from '../components/NowPlayingCardView'
import HeadingWithAction from '../components/HeadingWithAction'
import Button from '../components/Button'

class BroadcastScene extends Component {

  constructor(props) {
    super(props)

    this._renderSwitch = this._renderSwitch.bind(this)
    this._renderHeader = this._renderHeader.bind(this)

    this.state = {
      nowPlaying: {
        album_cover: null,
        song_title: 'Murder',
        artist_name: 'Lido',
        neutral: 'rgb(84, 107, 132)',
        accent: 'rgb(207, 66, 65)',
        progress: 0.7
      },
      playingNext: {
        album_cover: null,
        song_title: 'Murder',
        artist_name: 'Lido',
        neutral: 'rgb(84, 107, 132)',
        accent: 'rgb(207, 66, 65)',
        progress: 0.7
      }
    }
  }

  static propTypes = {
    goBack: PropTypes.func
  }

  state = {
    live: false,
    width: 375
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

  render() {

    const header = (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <View>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>Rachit's Bangers</Text>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Rachit Kataria</Text>
        </View>
        <Button tintColor="white">Edit</Button>
      </View>
    )

    return (
      <LinearGradient colors={['#FF6E88', '#BF2993']} {...this.props} style={[{ flex: 1 }, this.props.style]}>
        {this._renderHeader()}
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

          <Swiper
            style={{ overflow: 'visible', marginLeft: constants.unit * 2 }}
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

          </Swiper>

          <View style={{ marginTop: constants.unit * 3, paddingHorizontal: constants.unit * 4 }}>
            <Card style={{ marginBottom: constants.unit * 3 }} shadow={false}>
              <View style={{ padding: constants.unit * 3 }}>
                <HeadingWithAction
                  title="Up Next"
                  buttonTitle="Add song"
                />
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
