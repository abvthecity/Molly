import React, { Component } from 'react'
import {
  StatusBar,
  View, ScrollView,
  Image, Text,
  TouchableHighlight, StyleSheet
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import { BlurView } from 'react-native-blur'

// import ChannelsList from '../views/ChannelsList'
import ChannelCard from '../components/ChannelCard'
import constants from '../common/constants'

const IMAGE_PREFETCH_URL = 'https://pbs.twimg.com/profile_images/781996435961032705/1cSsL68X.jpg'
const album_cover = { uri: IMAGE_PREFETCH_URL }
Image.prefetch(IMAGE_PREFETCH_URL)

class ExploreScene extends Component {

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
    return(
      <View>
        <BlurView blurType="light" blurAmount={27.18} style={{ height: 20, position: 'absolute', left: 0, right: 0, zIndex: 100}}>
          <StatusBar barStyle="dark-content" />
        </BlurView>
        <ScrollView>

          <LinearGradient colors={['white', '#F2F2F2']} style={{ backgroundColor: 'transparent', padding: constants.unit * 4 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
              <Text style={{ fontSize: 40, fontWeight: '900' }}>Molly</Text>
              <TouchableHighlight onPress={() => {}}>
                <Text style={{ color: '#007AFF', fontSize: 17, letterSpacing: -0.23, fontWeight: '600', padding: constants.unit, marginRight: -constants.unit }}>Start a channel</Text>
              </TouchableHighlight>
            </View>
            <View style={{ height: 169, flex: 1, flexDirection: 'row', marginTop: constants.unit * 2, marginBottom: constants.unit * 2}}>
              <TouchableHighlight onPress={() => {}}
                style={[styles.colorBlockWrap, { marginRight: 2.5 }]}>
                <LinearGradient
                  colors={['#FFA832', '#FF5F33']} style={styles.colorBlock}>
                  <Text style={{ color: 'white', fontSize: 26 }}>My</Text>
                  <Text style={{ color: 'white', fontSize: 26, fontWeight: '900' }}>Favorites</Text>
                </LinearGradient>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {}}
                style={[styles.colorBlockWrap, { marginLeft: 2.5 }]}>
                <LinearGradient
                  colors={['#FF6E88', '#BF2993']} style={styles.colorBlock}>
                  <Text style={{ color: 'white', fontSize: 26 }}>Go <Text style={{ fontWeight: '900' }}>LIVE</Text></Text>
                </LinearGradient>
              </TouchableHighlight>
            </View>
          </LinearGradient>

          <View style={{ padding: constants.unit * 4 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: constants.unit * 4 }}>Nearby</Text>
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
  }
})

export default ExploreScene
