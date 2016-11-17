import React, { PropTypes } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import constants from '../common/constants'

const Card = props => {

  if (props.shadow === false) {

    return (
      <View {...props} style={[styles.card, styles.cardOffline, props.style]}>
        <View style={styles.card_wrap}>
          {props.children}
        </View>
      </View>
    )

  } else {

    return (
      <View {...props} style={[styles.card, styles.cardShadow, props.style]}>
        <LinearGradient
          colors={['white', '#F3F3F3']}
          style={styles.card_wrap}>
            {props.children}
        </LinearGradient>
      </View>
    )

  }
}

Card.propTypes = {
  shadow: PropTypes.bool
}

const styles = StyleSheet.create({
  card: {
    borderRadius: constants.borderRadiusLg,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: '#BFBFBF',
    backgroundColor: 'white',
  },
  cardShadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    overflow: 'visible'
  },
  cardOffline: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BFBFBF',
    backgroundColor: 'transparent'
  },
  card_wrap: {
    borderRadius: constants.borderRadiusLg,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    minHeight: 72,
  },
})

export default Card
