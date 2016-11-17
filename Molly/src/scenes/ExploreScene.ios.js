import React, { Component } from 'react'
import {
  View, ScrollView,
  Image, Text,
  TouchableOpacity, TouchableHighlight,
  StyleSheet
} from 'react-native'

import constants from '../common/constants'
import LinearGradient from 'react-native-linear-gradient'
import BlurStatusBar from '../components/BlurStatusBar'

// import ChannelsList from '../views/ChannelsList'
import ChannelCard from '../components/ChannelCard'

const IMAGE_PREFETCH_URL = 'https://pbs.twimg.com/profile_images/781996435961032705/1cSsL68X.jpg'
const album_cover = { uri: IMAGE_PREFETCH_URL }
Image.prefetch(IMAGE_PREFETCH_URL)

class ExploreScene extends Component {

  state = {
    browseTitle: 'Explore',
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

    const header = (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Text style={{ fontSize: 40, fontWeight: '900' }}>Molly</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.button}>Start a channel</Text>
        </TouchableOpacity>
      </View>
    )

    const favoritesBlock = (<LinearGradient
      colors={['#FFA832', '#FF5F33']} style={styles.colorBlock}>
      <Text style={{ color: 'white', fontSize: 26 }}>My</Text>
      <Text style={{ color: 'white', fontSize: 26, fontWeight: '900' }}>Favorites</Text>
    </LinearGradient>)

    const liveBlock = (<LinearGradient
      colors={['#FF6E88', '#BF2993']} style={styles.colorBlock}>
      <Text style={{ color: 'white', fontSize: 26 }}>Go <Text style={{ fontWeight: '900' }}>LIVE</Text></Text>
    </LinearGradient>)

    return (
      <View {...this.props}>
        <BlurStatusBar light={false} />
        <ScrollView>

          {/* SECTION 1 */}
          <LinearGradient colors={['white', '#F0F0F0']} style={{ backgroundColor: 'transparent', padding: constants.unit * 4 }}>
            {header}
            <View style={styles.blocks_wrap}>
              <TouchableHighlight onPress={() => {}} style={[styles.colorBlockWrap, { marginRight: 2.5 }]}>{favoritesBlock}</TouchableHighlight>
              <TouchableHighlight onPress={() => {}} style={[styles.colorBlockWrap, { marginLeft: 2.5 }]}>{liveBlock}</TouchableHighlight>
            </View>
          </LinearGradient>

          {/* SECTION 2 */}
          <View style={{ padding: constants.unit * 4 }}>
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

          </View>

        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  colorBlockWrap: {
    flex: 1,
    borderRadius: constants.borderRadiusSm,
    overflow: 'hidden'
  },
  colorBlock: {
    flex: 1,
    padding: constants.unit * 3,
    borderRadius: constants.borderRadiusSm,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'transparent'
  },
  button: {
    color: '#007AFF',
    fontSize: 17,
    letterSpacing: -0.23,
    fontWeight: '600',
    padding: constants.unit,
    marginRight: -constants.unit
  },
  blocks_wrap: {
    height: 169,
    flex: 1,
    flexDirection: 'row',
    marginTop: constants.unit * 2,
    marginBottom: constants.unit * 2
  },
  heading1: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: constants.unit * 4
  }
})

export default ExploreScene
