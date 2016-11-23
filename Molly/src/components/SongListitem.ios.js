import React, { PropTypes } from 'react'
import {
  View, Image, Text,
  StyleSheet
} from 'react-native'

import constants from '../common/constants'
import Listitem from '../components/Listitem'

const SongListitem = props => (
  <Listitem indent={constants.unit * 4} {...props}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Image source={props.imageURI} style={styles.list_album} />
      <View style={styles.track_wrap}>
        <Text style={styles.track_name} tail="tail" numberOfLines={1}>{props.name}</Text>
        <Text style={styles.track_sub} tail="tail" numberOfLines={1}>{props.artists}</Text>
        <Text style={styles.track_sub} tail="tail" numberOfLines={1}>{props.albumName}</Text>
      </View>
    </View>
  </Listitem>
)

SongListitem.propTypes = {
  imageURI: PropTypes.object,
  name: PropTypes.string,
  artists: PropTypes.string,
  albumName: PropTypes.string,
}

SongListitem.defaultProps = {
  imageURI: null,
  name: null,
  artists: null,
  albumName: null
}

const styles = StyleSheet.create({
  list_album: {
    width: 50, height: 50,
    borderRadius: constants.borderRadiusSm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginRight: constants.unit * 2
  },
  track_wrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  track_name: {
    fontWeight: '500',
    fontSize: 17
  },
  track_sub: {
    fontWeight: '400',
    fontSize: 12
  }
})

export default SongListitem
