import React, { Component, PropTypes } from 'react'
import {
  AppRegistry, NativeModules, NativeEventEmitter,
  NavigatorIOS, ActivityIndicator,
  View, Text, Modal
} from 'react-native'

import LandingScene from './src/scenes/LandingScene'
import ExploreScene from './src/scenes/ExploreScene'
import BroadcastScene from './src/scenes/BroadcastScene'
import FavoritesScene from './src/scenes/FavoritesScene'
import PlayerScene from './src/scenes/PlayerScene'

const SpotifyAPI = NativeModules.SpotifyAPI;
const SpotifyAPIEventEmitter = new NativeEventEmitter(SpotifyAPI);

const PlayerModal = props => (
  <Modal {...props} transparent={false}
    supportedOrientations={['portrait']}
    animationType={'slide'}>
    <PlayerScene goBack={props.close} />
  </Modal>
)

class Routes extends Component {

  static propTypes = {
    scene: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

  state = {
    loaded: false,
    isLoggedIn: false,
    showPlayer: false,
  }

  componentWillMount() {
    let _this = this

    SpotifyAPI.userHasAuth((error, hasAuth) => {

      if (!hasAuth) {
        _this.loginSubscriber = SpotifyAPIEventEmitter.addListener('Login', res => {
          if (res.success === true) {
            console.log("CLIENT_ID:", res.userSpotifyID)
            this.setState({ isLoggedIn: true })
          } else console.log("FAILED TO BEGIN")
        })
      } else this.setState({ isLoggedIn: true })

      this.setState({ loaded: true })

    })
  }

  componentWillUnmount() {
    if (this.LoginSubscriber) {
      this.LoginSubscriber.remove()
    }
  }

  _login = () => {
    SpotifyAPI.authenticate('b9aa2793ac1a476ea7ed07175f38a6dd', 'molly://callback')
    console.log("CALLED")
  }

  _logout = () => {
    // this.setState({ isLoggedIn: false })
  }

  _openPlayer = (channelId: string = null) => {
    this.setState({ showPlayer: true })
  }

  _closePlayer = () => {
    this.setState({ showPlayer: false })
  }

  _openFavorites = () => {
    this.props.navigator.push({ component: Routes, passProps: { scene: 'FAVORITES' } })
  }

  _openLive = () => {
    this.props.navigator.push({ component: Routes, passProps: { scene: 'LIVE' } })
  }

  render() {

    console.log(this.props.title)

    if (!this.state.loaded) {
      return <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    }

    if (!this.state.isLoggedIn) {
      return <LandingScene login={this._login} />
    }

    if (this.props.scene === 'EXPLORE') {
      return (
        <View {...this.props} style={[{ flex: 1 }, this.props.style]}>
          <ExploreScene
            openFavorites={this._openFavorites}
            openLive={this._openLive}
            openPlayer={this._openPlayer} />
          <PlayerModal
            visible={this.state.showPlayer}
            close={this._closePlayer} />
        </View>
      )
    } else if (this.props.scene === 'FAVORITES') {
      return (
        <View {...this.props} style={[{ flex: 1 }, this.props.style]}>
          <FavoritesScene
            goBack={this.props.navigator.pop}
            openPlayer={this._openPlayer} />
          <PlayerModal
            visible={this.state.showPlayer}
            close={this._closePlayer} />
        </View>
      )
    } else if (this.props.scene === 'LIVE') {
      return (
        <View {...this.props} style={[{ flex: 1 }, this.props.style]}>
          <BroadcastScene goBack={this.props.navigator.pop} />
        </View>
      )
    }

    return <View />

  }

}

const Molly = props => (
  <NavigatorIOS
    initialRoute={{
      component: Routes,
      title: 'Molly',
      passProps: { scene: 'EXPLORE' }
    }}
    interactivePopGestureEnabled={true}
    navigationBarHidden={true}
    style={{ flex: 1 }}
  />
)

AppRegistry.registerComponent('Molly', () => Molly)

export default Molly
