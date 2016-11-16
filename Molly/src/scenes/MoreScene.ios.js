import React, { Component } from 'react'
// import {
//
// } from 'react-native'

import ChannelsList from '../views/ChannelsList'

class MoreScene extends Component {

  render() {
    let title = "More"

    return(
      <ChannelsList
        title={title}
      />
    )
  }

}

export default MoreScene
