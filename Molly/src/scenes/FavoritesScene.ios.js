import React, { Component } from 'react'
// import {
//
// } from 'react-native'

import Channels from '../views/Channels'

class FavoritesScene extends Component {

  render() {
    let title = "Favorites"

    return(
      <Channels
        title={title}
      />
    )
  }

}

export default FavoritesScene
