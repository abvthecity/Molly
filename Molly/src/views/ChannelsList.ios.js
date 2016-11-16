import React, { Component, PropTypes } from 'react'
import {
  ScrollView, View,
  Text, TouchableHighlight,
  Image, StatusBar
} from 'react-native'

import constants from '../common/constants'

import ChannelCard from '../components/ChannelCard'

const IMAGE_PREFETCH_URL = 'https://pbs.twimg.com/profile_images/781996435961032705/1cSsL68X.jpg'
const album_cover = { uri: IMAGE_PREFETCH_URL }
Image.prefetch(IMAGE_PREFETCH_URL)

class ChannelsList extends Component {

  state = {
    cards: [{
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
    }]
  }

  _openChannel = (card) => {
      // console.log("triggered")
  }

  render() {
    return (
      <ScrollView style={{ padding: 20 }}>
        <StatusBar barStyle="dark-content" />

        <View>
          <Text style={{
            fontSize: 36,
            fontWeight: 'bold',
            marginBottom: 20
          }}>{this.props.title}</Text>
        </View>

        {this.state.cards.map((card, i) => (
          <TouchableHighlight
            key={i}
            style={{ marginBottom: 20, borderRadius: constants.borderRadiusLg + 1 }}
            onPress={() => this._openChannel(card)}>
            <ChannelCard
              title={card.title}
              host={card.host}
              distance={card.distance}
              live={card.live}
              nowPlaying={card.nowPlaying} />
          </TouchableHighlight>
        ))}
      </ScrollView>
    )
  }

}

export default ChannelsList;
