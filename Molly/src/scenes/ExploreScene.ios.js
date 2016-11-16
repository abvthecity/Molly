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
        {...this.props}
        title={title}
      />
    )
  }

}

export default ExploreScene
