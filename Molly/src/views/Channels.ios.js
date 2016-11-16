import React, { Component, PropTypes } from 'react'
import {
  ScrollView, View,
  Text, TouchableHighlight,
  Image
} from 'react-native'

import constants from '../common/constants'

import ChannelCard from '../components/ChannelCard'

const IMAGE_PREFETCH_URL = 'https://pbs.twimg.com/profile_images/781996435961032705/1cSsL68X.jpg'
const album_cover = { uri: IMAGE_PREFETCH_URL }
Image.prefetch(IMAGE_PREFETCH_URL)

class Channels extends Component {

  state = {
    cards: [0, 1, 2]
  }

  _openChannel = () => {
      // console.log("triggered")
  }

  render() {
    return (
      <ScrollView style={{ padding: 20 }}>
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
            onPress={this._openChannel}>
            <View>
              <ChannelCard
                title="Rachit's Bangers"
                host="Rachit Kataria"
                distance="400 FT"
                live={true}
                nowPlaying={{
                  album_cover: album_cover,
                  song_title: 'Murder',
                  artist_name: 'Lido',
                  neutral: 'rgb(84, 107, 132)',
                  accent: 'rgb(207, 66, 65)',
                  progress: 0.7
                }}

              />
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    )
  }

}

export default Channels;
