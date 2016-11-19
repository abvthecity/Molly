import React, { Component } from 'react'
import {
  AppRegistry, NativeModules, NativeEventEmitter,
  NavigatorIOS,
  View, Text, Modal
} from 'react-native'

import LandingScene from './src/scenes/LandingScene'
import ExploreScene from './src/scenes/ExploreScene'
import BroadcastScene from './src/scenes/BroadcastScene'
import FavoritesScene from './src/scenes/FavoritesScene'
import PlayerScene from './src/scenes/PlayerScene'

const SpotifyAPI = NativeModules.SpotifyAPI;
const SpotifyAPIEventEmitter = new NativeEventEmitter(SpotifyAPI);

class ExploreRoute extends Component {
  state = {
    showPlayer: false
  }

  _openFavorites = () => {
    this.props.navigator.push({
      component: FavoritesRoute,
      passProps: {
        goBack: () => {
          this.props.navigator.pop()
        }
      }
    })
  }

  _openLive = () => {
    this.props.navigator.push({
      component: BroadcastScene,
      passProps: {
        goBack: () => {
          this.props.navigator.pop()
        }
      }
    })
  }

  render() {
    return (
      <View {...this.props} style={[{ flex: 1 }, this.props.style]}>
        <ExploreScene
          openFavorites={this._openFavorites}
          openLive={this._openLive}
          openPlayer={() => this.setState({ showPlayer: true })} />

        {/* PLAYER */}
        <Modal transparent={false}
          visible={this.state.showPlayer}
          supportedOrientations={['portrait']}
          animationType={'slide'}>
          <PlayerScene goBack={() => this.setState({ showPlayer: false })} />
        </Modal>
      </View>
    )
  }
}

class FavoritesRoute extends Component {
  state = {
    showPlayer: false
  }

  render() {
    return (
      <View {...this.props} style={[{ flex: 1 }, this.props.style]}>

        <FavoritesScene
          goBack={this.props.goBack}
          openPlayer={() => this.setState({ showPlayer: true }) }
        />

        {/* PLAYER */}
        <Modal transparent={false}
          visible={this.state.showPlayer}
          supportedOrientations={['portrait']}
          animationType={'slide'}>
          <PlayerScene goBack={() => this.setState({ showPlayer: false })} />
        </Modal>
      </View>
    )
  }
}

const LiveRoute = props => (
  <View {...props} style={[{ flex: 1 }, props.style]}>
    <BroadcastScene goBack={props.goBack} />
  </View>
)

class Molly extends Component {
  state = {
    isLoggedIn: false
  }

  componentWillMount() {
    SpotifyAPI.isLoggedIn((error, loggedInState) => {
      this.setState({
        isLoggedIn: loggedInState
      })
    })
  }

  componentDidMount() {
    this.LoginSubscriber = SpotifyAPIEventEmitter.addListener('Login', res => {
      if (res.success === true) {
        console.log("CLIENT_ID:", res.userSpotifyID)
        SpotifyAPI.isLoggedIn((error, loggedInState) => {
          this.setState({ isLoggedIn: loggedInState })
        })
      } else console.log("FAILED TO BEGIN")
    })
  }

  componentWillUnmount() {
    this.LoginSubscriber.remove()
  }

  _login = () => {
    SpotifyAPI.authenticate('b9aa2793ac1a476ea7ed07175f38a6dd', 'molly://callback')
    console.log("CALLED")
  }

  _logout = () => {
    // this.setState({ isLoggedIn: false })
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <NavigatorIOS
          initialRoute={{
            title: 'Explore',
            component: ExploreRoute
          }}
          interactivePopGestureEnabled={false}
          navigationBarHidden={true}
          style={{ flex: 1 }}
        />
      )
    } else {
      return (
        <LandingScene login={this._login} />
      )
    }
  }
}

AppRegistry.registerComponent('Molly', () => Molly)

export default Molly
