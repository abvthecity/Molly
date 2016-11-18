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

class Router extends Component {

  state = {
    isLoggedIn: false,
    showModal: null
  }

  render() {

    return (
      <View>

        <ExploreScene
          openFavorites={() => this.setState({ showModal: "FAVORITES" })}
          openLive={() => this.setState({ showModal: "LIVE" })}
          openPlayer={() => this.setState({ showModal: "PLAYER" })}
        />

        {/* LANDING */}
        <Modal transparent={false}
          visible={!this.state.isLoggedIn}
          supportedOrientations={['portrait']}
          animationType={'slide'}>
          <LandingScene login={() => this.setState({ isLoggedIn: true })} />
        </Modal>

        {/* FAVORITES */}
        <Modal transparent={false}
          visible={this.state.showModal === "FAVORITES"}
          supportedOrientations={['portrait']}
          animationType={'slide'}>
          <FavoritesScene goBack={() => this.setState({ showModal: null })} />
        </Modal>

        {/* GO LIVE */}
        <Modal transparent={false}
          visible={this.state.showModal === "LIVE"}
          supportedOrientations={['portrait']}
          animationType={'slide'}>
          <BroadcastScene goBack={() => this.setState({ showModal: null })} />
        </Modal>

        {/* PLAYER */}
        <Modal transparent={false}
          visible={this.state.showModal === "PLAYER"}
          supportedOrientations={['portrait']}
          animationType={'slide'}>
          <PlayerScene goBack={() => this.setState({ showModal: null })} />
        </Modal>
      </View>
    )
  }
}

export default Router
