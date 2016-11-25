import React, { Component } from 'react'
import {
  Modal, View, ScrollView,
  Text, Image,
  TextInput, StyleSheet
} from 'react-native'

import { BlurView } from 'react-native-blur'
import constants from '../common/constants'
import { get, post } from '../common/fetch'
import BlurStatusBar from '../components/BlurStatusBar'

import SongListitem from '../components/SongListitem'
import Button from '../components/Button'

class SpotifySearchModal extends Component {

  constructor(props) {
    super(props)
    this._onChangeText = this._onChangeText.bind(this)
    // this._onEndEditing = this._onEndEditing.bind(this)
    this._spotifySearch = this._spotifySearch.bind(this)
  }

  state = {
    query: '',
    results: []
  }

  _onChangeText(query) {
    this.setState({ query })
  }

  _spotifySearch() {
    let _this = this;
    get('https://api.spotify.com/v1/search?type=track&limit=50&q=' + this.state.query.replace(' ', '+'))
      .then(res => {
        if ('error' in res) {
          _this.setState({ results: [] })
        } else {
          _this.setState({ results: res.tracks.items })
        }
      })
      .catch(console.error)
  }

  render() {
    return (
      <Modal {...this.props}
        supportedOrientations={['portrait']}
        transparent={false}
        animationType={'slide'}
        onShow={() => this.refs.search.focus()}>
        <BlurStatusBar light={false} />

        <BlurView blurType={'xlight'} blurAmount={27.18} style={styles.header}>
          <TextInput ref="search"
            placeholder="Search tracks on Spotify"
            value={this.state.query}
            style={styles.search_input}
            onChangeText={this._onChangeText}
            onEndEditing={this._spotifySearch} />
            <Button style={{ marginLeft: constants.unit * 2}} onPress={this.props.cancel}>Cancel</Button>
        </BlurView>

        <ScrollView style={{ flex: 1 }}>
          {this.state.results.map((track, i) => (
            <SongListitem key={i} onPress={() => this.props.addSong(track)}
              imageURI={{ uri: track.album.images[1].url }}
              name={track.name}
              artists={track.artists.map(d => d.name).join(', ')}
              albumName={track.album.name}
            />
          ))}
        </ScrollView>

      </Modal>
    )
  }

}

const styles = StyleSheet.create({
  header: {
    padding: constants.unit * 2,
    paddingTop: constants.unit * 2 + 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#C8C7CC'
  },
  search_input: {
    flex: 1,
    paddingHorizontal: constants.unit * 2,
    height: 28,
    fontSize: 14,
    backgroundColor: '#E5E5E5',
    borderRadius: constants.borderRadiusSm,
  }
})

export default SpotifySearchModal
