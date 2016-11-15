import React, { Component } from 'react'
// import {
//
// } from 'react-native'

import Channels from '../views/Channels'

class BroadcastScene extends Component {

  render() {
    let title = "Broadcast"

    return(
      <Channels
        title={title}
      />
    )
  }

}

export default BroadcastScene
