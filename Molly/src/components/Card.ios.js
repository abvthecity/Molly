import React, { PropTypes } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import constants from '../common/constants'

const Card = props => {

  // define style array
  let style = [styles.card]
  if (props.shadow) style.push(styles.cardShadow)
  if (props.border) style.push(styles.cardBorder)
  style.push(props.style)

  return (
    <View {...props} style={style}>
      <LinearGradient
        colors={['white', '#F3F3F3']}
        style={styles.card_wrap}>
          {props.children}
      </LinearGradient>
    </View>
  )
}

Card.propTypes = {
  shadow: PropTypes.bool,
  border: PropTypes.bool
}

Card.defaultProps = {
  shadow: true,
  border: false
}

const styles = StyleSheet.create({
  card: {
    borderColor: '#BFBFBF',
    backgroundColor: 'white',
    borderRadius: constants.borderRadiusLg,
  },
  cardBorder: {
    // borderWidth: StyleSheet.hairlineWidth,
  },
  cardShadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    overflow: 'visible'
  },
  card_wrap: {
    borderRadius: constants.borderRadiusLg,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    // minHeight: 72,
    flex: 1
  },
})

export default Card
