import React, { PropTypes } from 'react'
import {
  View, TouchableOpacity, Text,
  StyleSheet
} from 'react-native'

import constants from '../common/constants'

const HeadingWithAction = props => (
  <View {...props} style={[styles.wrap, props.style]}>

    <Text style={{ fontSize: 24, fontWeight: '800' }}>{props.title}</Text>

    {(() => {
      if (props.buttonTitle !== null) {
        return (<TouchableOpacity onPress={props.onButtonPress}>
          <Text style={styles.button}>{props.buttonTitle}</Text>
        </TouchableOpacity>)
      }
    })()}

  </View>
)

HeadingWithAction.propTypes = {
  title: PropTypes.string.isRequired,
  onButtonPress: PropTypes.func,
  buttonTitle: PropTypes.string
}

HeadingWithAction.defaultProps = {
  onButtonPress: () => {},
  buttonTitle: null
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  button: {
    color: '#007AFF',
    fontSize: 17,
    letterSpacing: -0.23,
    fontWeight: '600',
    padding: constants.unit,
    marginRight: -constants.unit
  }
})

export default HeadingWithAction
