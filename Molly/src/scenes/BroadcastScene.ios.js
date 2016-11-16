import React, { Component } from 'react'
import {
  Image
} from 'react-native'

import ChannelsList from '../views/ChannelsList'
import ChannelPlayer from '../views/ChannelPlayer'


const IMAGE_PREFETCH_URL = 'https://pbs.twimg.com/profile_images/781996435961032705/1cSsL68X.jpg'
const album_cover = { uri: IMAGE_PREFETCH_URL }
Image.prefetch(IMAGE_PREFETCH_URL)

class BroadcastScene extends Component {

  state = {
    title: 'Rachit\'s Bangers',
    host: 'Rachit Kataria',
    distance: '400 FT',
    live: true,
    nowPlaying: {
      album_cover: album_cover,
      song_title: 'Murder',
      artist_name: 'Lido',
      neutral: 'rgb(84, 107, 132)',
      accent: 'rgb(207, 66, 65)',
      progress: 0.7
    }
  }

  render() {
    let title = "Broadcast"

    return(
      <ChannelPlayer
        title={this.state.title}
        host={this.state.host}
        distance={this.state.distance}
        live={this.state.live}
        nowPlaying={this.state.nowPlaying}
        style={{ flex: 1 }}
      />
    )
  }

}

export default BroadcastScene
