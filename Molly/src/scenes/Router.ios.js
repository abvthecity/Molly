import React, { Component } from 'react'
import {
  NavigatorIOS,
  View, Text, Modal
} from 'react-native'

import LandingScene from './LandingScene'
import ExploreScene from './ExploreScene'
import BroadcastScene from './BroadcastScene'
import FavoritesScene from './FavoritesScene'
import PlayerScene from './PlayerScene'

class ExploreRoute extends Component {
  state = {
    isLoggedIn: false,
    // showLive: false,
    showPlayer: false
  }

  _login = () => {
    this.setState({ isLoggedIn: true })
  }

  _logout = () => {
    this.setState({ isLoggedIn: false })
  }

  render() {
    return (
      <View {...this.props} style={[{ flex: 1 }, this.props.style]}>
        <ExploreScene
          openFavorites={() => this.props.navigator.push({
            component: FavoritesRoute,
            passProps: {
              goBack: () => {
                this.props.navigator.pop()
              }
            }
          })}
          openLive={() => this.props.navigator.push({
            component: BroadcastScene,
            passProps: {
              goBack: () => {
                this.props.navigator.pop()
              }
            }
          })}
          // openLive={() => this.setState({ showLive: true })}
          openPlayer={() => this.setState({ showPlayer: true })} />

        {/* LANDING */}
        <Modal transparent={false}
          visible={!this.state.isLoggedIn}
          supportedOrientations={['portrait']}
          animationType={'slide'}>
          <LandingScene login={this._login} />
        </Modal>

        {/* GO LIVE */}
        {/* <Modal transparent={false}
          visible={this.state.showLive}
          supportedOrientations={['portrait']}
          animationType={'slide'}>
          <BroadcastScene goBack={() => this.setState({ showLive: false })} />
        </Modal> */}

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



const LiveRoute = () => (
  <View {...this.props} style={[{ flex: 1 }, this.props.style]}>
    <BroadcastScene goBack={this.props.goBack} />
  </View>
)



class Router extends Component {

  render() {

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
  }
}

export default Router
