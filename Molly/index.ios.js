import React, { Component, PropTypes } from 'react'
import {
  AppRegistry, NativeModules, NativeEventEmitter,
  NavigatorIOS, ActivityIndicator,
  View, Text, Modal, AsyncStorage
} from 'react-native'

import LandingScene from './src/scenes/LandingScene'
import ExploreScene from './src/scenes/ExploreScene'
import BroadcastScene from './src/scenes/BroadcastScene'
import FavoritesScene from './src/scenes/FavoritesScene'
import PlayerScene from './src/scenes/PlayerScene'

const SpotifyAPI = NativeModules.SpotifyAPI;
const SpotifyAPIEventEmitter = new NativeEventEmitter(SpotifyAPI);

import ws from './src/common/socket'
const socket = new ws()

const PlayerModal = props => (
  <Modal {...props} transparent={false}
    supportedOrientations={['portrait']}
    animationType={'slide'}>
    <PlayerScene goBack={props.close} clientId={props.clientId} />
  </Modal>
)

class Routes extends Component {

  static propTypes = {
    scene: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

  state = {
    loaded: false,
    loginAttempted: false,
    isLoggedIn: false,
    showPlayer: false,
    clientId: null
  }

  componentWillMount() {
    let _this = this

    // check if already authenticated
    SpotifyAPI.userHasAuth((error, hasAuth) => {
      this.setState({ loginAttempted: false })

      // no authentication avail, open webview
      if (!hasAuth) {
        _this.loginSubscriber = SpotifyAPIEventEmitter.addListener('Login', res => {
          if (res.success === true) {
            console.log("CLIENT_ID:", res.userSpotifyID)

            AsyncStorage.setItem('@SessionData:ClientID', res.userSpotifyID)
              .then(() => _this.setState({ isLoggedIn: true, clientId: res.userSpotifyID }))
              .catch(console.error)

          } else console.log("FAILED TO BEGIN")
        })
      } else this.setState({ isLoggedIn: true })

      // already authenticated, jump right in
      AsyncStorage.getItem('@SessionData:ClientID')
        .then(id => _this.setState({ loaded: true, clientId: id }))
        .catch(console.error)
    })

    // add websocket listener
    socket.addListener("index", this._onMessage)
  }

  componentWillUnmount() {
    if (this.LoginSubscriber) {
      this.LoginSubscriber.remove()
      socket.removeListener("index")
    }
  }

  _onMessage(e) {
    console.log(e)
  }

  _login = () => {
    this.setState({ loginAttempted: true })
    SpotifyAPI.authenticate('b9aa2793ac1a476ea7ed07175f38a6dd', 'molly://callback')
    console.log("CALLED")
  }

  _logout = () => {
    console.log("SOMETHING")
    SpotifyAPI.logout((error, res) => {
      this.setState({ isLoggedIn: false, showPlayer: false, clientId: null })
    })
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
      return (
        <View style={{ flex: 1 }}>
          <LandingScene login={this._login} />
          {(() => {
            if (this.state.loginAttempted) {
              return (
                <View style={{
                  position: 'absolute',
                  left: 0, right: 0, top: 0, bottom: 0,
                  zIndex: 100,
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}><ActivityIndicator size="large" color="black" />
                </View>
              )
            }
          })()}
        </View>
      )
    }

    if (this.props.scene === 'EXPLORE') {
      return (
        <View {...this.props} style={[{ flex: 1 }, this.props.style]}>
          <ExploreScene clientId={this.state.clientId}
            openFavorites={this._openFavorites}
            openLive={this._openLive}
            openPlayer={this._openPlayer}
            logout={this._logout}
            socket={socket} />
          <PlayerModal clientId={this.state.clientId}
            visible={this.state.showPlayer}
            close={this._closePlayer}
            socket={socket} />
        </View>
      )
    } else if (this.props.scene === 'FAVORITES') {
      return (
        <View {...this.props} style={[{ flex: 1 }, this.props.style]}>
          <FavoritesScene clientId={this.state.clientId}
            goBack={this.props.navigator.pop}
            openPlayer={this._openPlayer}
            socket={socket} />
          <PlayerModal clientId={this.state.clientId}
            visible={this.state.showPlayer}
            close={this._closePlayer}
            socket={socket} />
        </View>
      )
    } else if (this.props.scene === 'LIVE') {
      return (
        <View {...this.props} style={[{ flex: 1 }, this.props.style]}>
          <BroadcastScene
            clientId={this.state.clientId}
            goBack={this.props.navigator.pop}
            socket={socket} />
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
