import React, { Component } from 'react'
// import {
//
// } from 'react-native'

import ChannelsList from '../views/ChannelsList'

class ExploreScene extends Component {

  render() {
    let title = "Explore"

    return(
      <ChannelsList
        title={title}
      />
    )
  }

}

export default ExploreScene
