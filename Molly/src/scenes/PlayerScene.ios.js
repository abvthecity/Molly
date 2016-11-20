import React, { Component } from 'react'
import {
  View, ScrollView, Text, TouchableHighlight, TouchableWithoutFeedback,
  ProgressViewIOS, ListView, Image,
  StyleSheet, Modal, Animated, Easing,
  NativeModules, NativeEventEmitter
} from 'react-native'

const SpotifyAPI = NativeModules.SpotifyAPI;
const SpotifyAPIEventEmitter = new NativeEventEmitter(SpotifyAPI);

import LinearGradient from 'react-native-linear-gradient'

import constants from '../common/constants'
import Card from '../components/Card'
import Listitem from '../components/Listitem'
import BlurNavigator from '../components/BlurNavigator'
import BlurStatusBar from '../components/BlurStatusBar'

class PlayerScene extends Component {

  constructor(props) {
    super(props)

    this.state = {
      muted: false,
      animatedValue: new Animated.Value(1),
      title: 'Rachit\'s Bangers',
      host: 'Rachit Kataria',
      nowPlaying: {
        album_cover: null,
        song_title: null,
        artist_name: null,
        uri: null,
        progress: 0
      }
    }

    this.toggleMute = this.toggleMute.bind(this)
  }

  componentWillMount() {
    let _this = this

    let trackId = '2Im64pIz6m0EJKdUe6eZ8r'


    fetch('https://api.spotify.com/v1/tracks/' + trackId)
      .then(res => res.json())
      .then(res => {
        Image.prefetch(res.album.images[0].url)
        return {
          album_cover: { uri: res.album.images[0].url } || null,
          song_title: res.name || null,
          artist_name: res.artists.map(d => d.name).join(', ') || null,
          uri: res.uri,
          progress: 0,
        }
      })
      .then(nowPlaying => {
        _this.setState({ nowPlaying }, () => {
          SpotifyAPI.playURI(nowPlaying.uri, 0, error => {
            if (error === null) _this._setPlaying()
            else console.error(error)
          })
        })
      })
      .catch(console.error)

  }

  componentWillUnmount() {
    SpotifyAPI.setIsPlaying(false, error => {
      if (error != null) console.error(error)
    })
  }

  _setPlaying() {
    SpotifyAPI.setIsPlaying(!this.state.muted, error => {
      if (error !== null) console.error(error)
    })
  }

  toggleMute() {
    this.setState({ muted: !this.state.muted}, () => {
      if (this.state.muted) {
        Animated.timing(this.state.animatedValue,
          { toValue: 0, easing: Easing.elastic(0) }
        ).start()
      } else {
        Animated.spring(this.state.animatedValue,
          { toValue: 1, velocity: 3, tension: 20, friction: 5 }
        ).start()
      }

      this._setPlaying()
    })

  }

  render () {

    const scale = this.state.animatedValue.interpolate({
      inputRange: [0, 1], outputRange: [0.7, 1]
    })
    const shadowOpacity = this.state.animatedValue.interpolate({
      inputRange: [0, 1], outputRange: [0, 0.5]
    })
    const shadowRadius = this.state.animatedValue.interpolate({
      inputRange: [0, 1], outputRange: [0, 24]
    })

    return (
      // <LinearGradient colors={['white', '#F0F0F0']} style={{ flex: 1 }} {...this.props}>
      // <Modal {...this.props} transparent={false} supportedOrientations={['portrait']} animationType={'slide'}>
        <View {...this.props} style={[{ flex: 1, backgroundColor: 'black' }, this.props.style]}>
          <BlurNavigator
            light={true}
            dark={true}
            onLeftButtonPress={this.props.goBack}
            leftButtonTitle="Close">
            <Text style={{
              color: 'white',
              fontSize: 20,
              fontWeight: '900',
              textAlign: 'center'
            }}>TopKek</Text>
            <Text style={{
              color: 'white',
              fontSize: 11,
              fontWeight: '500',
              textAlign: 'center'
            }}>Rachit Kataria</Text>
          </BlurNavigator>
          <ScrollView style={{ paddingTop: 64 }}>
            <Card shadow={true} style={[{ zIndex: 2}, { flex: 1 }]}>

              <View style={styles.card_object_inner}>
                <View style={{ position: 'absolute', top: 2, left: 0, right: 0 }}>
                  <Text style={{ flex: 1, fontSize: 11, fontWeight: '500', color: '#FF2D55', textAlign: 'center' }}>LIVE</Text>
                </View>

                <TouchableWithoutFeedback onPress={this.toggleMute}>
                  <View style={{ width: 343, height: 343, flex: 1 }}>
                    <Animated.View style={{
                      flex: 1,
                      borderRadius: constants.borderRadiusMd,
                      overflow: 'visible',
                      transform: [{ scale: scale }],
                      shadowColor: 'black',
                      shadowOffset: {
                        width: 0,
                        height: 7,
                      },
                      shadowOpacity: shadowOpacity,
                      shadowRadius: shadowRadius,
                      backgroundColor: 'white'
                    }}>
                      <Image source={this.state.nowPlaying.album_cover} style={{ flex: 1, resizeMode: 'cover', borderRadius: constants.borderRadiusMd, overflow: 'hidden'}} />
                    </Animated.View>
                  </View>
                </TouchableWithoutFeedback>

                <View style={{ marginTop: constants.unit * 6 }}>
                  <ProgressViewIOS
                    progress={0.8}
                    progressTintColor={'#FF2D55'}
                    trackTintColor={'rgba(0, 0, 0, 0.15)'}
                    style={{ height: 3, borderRadius: 1.5, overflow: 'hidden'}}
                  />
                  <View style={styles.under_bar}>
                    <Text style={styles.under_bar_text}>0:15</Text>
                    <Text style={styles.under_bar_text}>-2:53</Text>
                  </View>
                </View>

                <View style={{ marginVertical: constants.unit * 2 }}>
                  <Text style={{ fontSize: 24, fontWeight: '800', color: 'black', letterSpacing: -1}}>Lost in the World</Text>
                  <Text style={{ fontSize: 24, fontWeight: '500', color: '#808080', letterSpacing: -1}}>Kanye West</Text>
                </View>
              </View>

              <View style={styles.line}/>

              <View style={{backgroundColor: '#EEEEEE'}}>
                <View style={styles.card_object_inner}>
                  <Text style={{ fontSize: 24, fontWeight: '900' }}>Up Next</Text>
                </View>

                <View>
                  {['SONG 1', 'SONG 2'].map((item, i) => (
                    <Listitem key={i}
                      indent={constants.unit * 4}
                      backgroundColor="transparent"
                      text={item} />
                  ))}
                </View>

                <View style={styles.card_object_inner} />
              </View>
            </Card>
          </ScrollView>
        </View>
      // </Modal>
      // </LinearGradient>
    )
  }

}

const styles = StyleSheet.create({
  card_object: {
    // marginHorizontal: constants.unit * 2,
    // marginBottom: constants.unit * 3
  },
  card_object_inner: {
    padding: constants.unit * 4
  },
  under_bar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: constants.unit
  },
  under_bar_text: {
    fontSize: 13,
    fontWeight: '500',
    color: '#88888D',
    letterSpacing: 0.4
  },
  list: {
    marginTop: constants.unit * 2,
  },
  line: {
    backgroundColor: '#bbbbbb',
    height: StyleSheet.hairlineWidth,
  },
  row: {
    justifyContent: 'center',
    paddingHorizontal: constants.unit * 4,
    paddingVertical: constants.unit * 4,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
    marginLeft: constants.unit * 4
  },
  rowNote: {
    fontSize: 17,
  },
  rowText: {
    fontSize: 17,
    fontWeight: '500',
  },
})

export default PlayerScene
