import React from 'react'
import {
  Image
} from 'react-native'

import Promise from 'bluebird'

const IMAGE_PREFETCH_URL = 'https://pbs.twimg.com/profile_images/781996435961032705/1cSsL68X.jpg'
const album_cover = { uri: IMAGE_PREFETCH_URL }
Image.prefetch(IMAGE_PREFETCH_URL)
const data = [{
  title: 'Rachit\'s Bangers',
  host: 'Rachit Kataria',
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
  nowPlaying: {
    album_cover: album_cover,
    song_title: 'Murder',
    artist_name: 'Lido',
    neutral: 'rgb(84, 107, 132)',
    accent: 'rgb(207, 66, 65)',
    progress: 0.7
  }
}]

let API = {}

// get a list of channels to populate the EXPLORE scene
API.getChannels = () => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

API.getFavorites = () => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

// get the user's cached library
API.getLive = () => {
 return new Promise((resolve, reject) => {

 })
}

export default API
