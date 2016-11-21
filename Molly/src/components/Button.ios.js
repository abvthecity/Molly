import React, { PropTypes } from 'react'
import {
  TouchableOpacity, Text
} from 'react-native'

const Button = props => (
  <TouchableOpacity {...props}
    hitSlop={{top: 16, left: 16, bottom: 16, right: 16}}
    onPress={props.onPress}
    disabled={props.disabled}>
    <Text style={[{
      fontSize: 17,
      fontWeight: '600',
      letterSpacing: -0.24,
      // marginHorizontal: 6,
      textAlign: 'center',
      color: props.tintColor,
      opacity: !props.disabled ? 1 : 0.5,
    }, props.textStyle]}>

      {props.children}

    </Text>
  </TouchableOpacity>
)

Button.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  tintColor: PropTypes.string,
  textStyle: PropTypes.object,
  children: PropTypes.any
}

Button.defaultProps = {
  onPress: () => {},
  disabled: false,
  tintColor: '#007AFF',
  textStyle: {}
}

export default Button
