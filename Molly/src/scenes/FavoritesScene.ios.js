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
        title={title}
      />
    )
  }

}

export default FavoritesScene
