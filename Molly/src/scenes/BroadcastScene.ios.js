import React, { Component } from 'react'
import {
  View, ScrollView,
  Image, Text,
  TouchableOpacity, TouchableHighlight,
  StyleSheet
} from 'react-native'

import constants from '../common/constants'
import LinearGradient from 'react-native-linear-gradient'
import BlurStatusBarDark from '../components/BlurStatusBarDark'


const IMAGE_PREFETCH_URL = 'https://pbs.twimg.com/profile_images/781996435961032705/1cSsL68X.jpg'
const album_cover = { uri: IMAGE_PREFETCH_URL }
Image.prefetch(IMAGE_PREFETCH_URL)

class BroadcastScene extends Component {

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
    },{
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
    },{
      title: 'Rachit\'s Bangers',
      host: 'Rachit Kataria',
      distance: '400 FT',
      live: false,
      nowPlaying: {
        album_cover: album_cover,
        song_title: 'Murder',
        artist_name: 'Lido',
        neutral: 'rgb(84, 107, 132)',
        accent: 'rgb(207, 66, 65)',
        progress: 0.7
      }
    },{
      title: 'Rachit\'s Bangers',
      host: 'Rachit Kataria',
      distance: '400 FT',
      live: false,
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

  render() {

    return (
      <LinearGradient colors={['#FF6E88', '#BF2993']} {...this.props} style={[{ flex: 1 }, this.props.style]}>
        <BlurStatusBarLight />
        <ScrollView style={{ backgroundColor: 'transparent' }}>

          <View>
            <Text>HI</Text>
            <Text>HI</Text>
          </View>

          {/* SECTION 1 */}
          {/* <LinearGradient colors={['white', '#F2F2F2']} style={{ backgroundColor: 'transparent', padding: constants.unit * 4 }}>
            <View style={styles.header}>
              <Text style={{ fontSize: 40, fontWeight: '900' }}>{title}</Text>
              <TouchableOpacity onPress={() => {}}>{button}</TouchableOpacity>
            </View>
            <View style={styles.blocks_wrap}>
              <TouchableHighlight onPress={() => {}} style={[styles.colorBlockWrap, { marginRight: 2.5 }]}>{favoritesBlock}</TouchableHighlight>
              <TouchableHighlight onPress={() => {}} style={[styles.colorBlockWrap, { marginLeft: 2.5 }]}>{liveBlock}</TouchableHighlight>
            </View>
          </LinearGradient> */}

          {/* SECTION 2 */}
          {/* <View style={{ padding: constants.unit * 4 }}>
            <Text style={styles.heading1}>{this.state.browseTitle}</Text>

            {this.state.cards.map((card, i) => (
              <TouchableHighlight key={i}
                style={{ marginBottom: constants.unit * 3, borderRadius: constants.borderRadiusLg }}
                onPress={() => {}}>
                <ChannelCard
                  title={card.title}
                  host={card.host}
                  distance={card.distance}
                  live={card.live}
                  nowPlaying={card.nowPlaying}
                />
              </TouchableHighlight>
            ))}

          </View> */}

        </ScrollView>
      </LinearGradient>
    )
  }

}

export default BroadcastScene
