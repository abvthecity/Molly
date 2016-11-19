import React, { PropTypes } from 'react'
import {
  View, TouchableOpacity, Text,
  StyleSheet
} from 'react-native'

import constants from '../common/constants'
import Button from './Button'

const HeadingWithAction = props => (
  <View {...props} style={[styles.wrap, props.style]}>

    <Text style={{ fontSize: 24, fontWeight: '800' }}>{props.title}</Text>

    {(() => {
      if (props.buttonTitle !== null) {
        return <Button onPress={props.onButtonPress} textStyle={{ textAlign: 'right' }}>{props.buttonTitle}</Button>
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
  }
})

export default HeadingWithAction
