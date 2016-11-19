import React, { Component, PropTypes } from 'react'
import {
  View, ScrollView,
  Image, Text, Switch,
  TouchableOpacity, TouchableHighlight,
  StyleSheet
} from 'react-native'

import constants from '../common/constants'
import LinearGradient from 'react-native-linear-gradient'
import BlurNavigator from '../components/BlurNavigator'
import { BlurView, VibrancyView } from 'react-native-blur'

import Card from '../components/Card'
import NowPlayingCardView from '../components/NowPlayingCardView'
import HeadingWithAction from '../components/HeadingWithAction'

class BroadcastScene extends Component {

  constructor(props) {
    super(props)

    this._renderSwitch = this._renderSwitch.bind(this)
    this._renderHeader = this._renderHeader.bind(this)
  }

  static propTypes = {
    goBack: PropTypes.func
  }

  state = {
    live: false
  }

  _renderSwitch() {
    return (
      <Switch
        onValueChange={value => this.setState({ live: value })}
        value={this.state.live}
        tintColor="rgba(255, 255, 255, 0.35)"
      />
    )
  }

  _renderHeader() {
    let content = <Text style={{ color: 'white', textAlign: 'center', fontWeight: '500', opacity: 0.7}}>OFFLINE</Text>
    if (this.state.live) content = <Text style={{ color: 'white', textAlign: 'center', fontWeight: '800'}}>ONLINE</Text>

    return (
      <BlurNavigator light={true}
        onLeftButtonPress={this.props.goBack}
        leftButtonTitle="Cancel"
        leftButtonDisabled={this.state.live}
        rightContent={this._renderSwitch}
      >{content}</BlurNavigator>
    )
  }

  render() {

    const header = (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Text style={{ color: 'white', fontSize: 40, fontWeight: '300' }}>{this.state.live ? '' : 'Go '}<Text style={{fontWeight: '900'}}>LIVE</Text></Text>
        {/* <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.button, { color: 'white' }]}>Add Song</Text>
        </TouchableOpacity> */}
      </View>
    )

    return (
      <LinearGradient colors={['#FF6E88', '#BF2993']} {...this.props} style={[{ flex: 1 }, this.props.style]}>
        {this._renderHeader()}
        <ScrollView style={{ backgroundColor: 'transparent', flex: 1, paddingTop: constants.navpad + 20 }}>
          <View style={{ padding: constants.unit * 4 }}>{header}</View>

          <View style={{ padding: constants.unit * 4, paddingTop: 0 }}>
            <Card style={{ marginBottom: constants.unit * 3 }}>
              <NowPlayingCardView nowPlaying={{
                album_cover: null,
                song_title: 'Murder',
                artist_name: 'Lido',
                neutral: 'rgb(84, 107, 132)',
                accent: 'rgb(207, 66, 65)',
                progress: 0.7
              }} />
            </Card>

            <Card style={{ marginBottom: constants.unit * 3 }}>
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
