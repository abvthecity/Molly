import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import constants from '../common/constants'

class FavoritesCard extends Component {
  static propTypes = {
    card: React.PropTypes.string
  }

  render() {
    return (
      <LinearGradient
          colors={['#FF6E88', '#BF2993']} style={styles.colorBlock}>
          <Text style={{ color: 'white', fontSize: 26, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>{this.props.card}</Text>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  colorBlock: {
    flex: 1,
    padding: constants.unit * 3,
    borderRadius: constants.borderRadiusSm,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'transparent'
  },
})

export default FavoritesCard
