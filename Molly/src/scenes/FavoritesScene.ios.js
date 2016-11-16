import React, { Component } from 'react'
// import {
//
// } from 'react-native'

import ChannelsList from '../views/ChannelsList'

class FavoritesScene extends Component {

  render() {
    let title = "Favorites"

    return(
      <ChannelsList
        {...this.props}
        title={title}
      />
    )
  }

}

export default FavoritesScene
