import React, { PropTypes } from 'react'
import {
  View, TouchableOpacity, Image, Text,
  StyleSheet
} from 'react-native'

import BlurStatusBar from './BlurStatusBar'

const BlurNavigator = props => {

  let tintColor = '#007AFF'

  if (props.light === true) {
    tintColor = 'white'
  }

  const leftButton = () => {
    if (props.leftButtonTitle !== null) {
      return (
        <TouchableOpacity onPress={props.onLeftButtonPress} style={{ flex: 1 }} disabled={props.leftButtonDisabled}>
          <View style={[styles.button_wrap, { justifyContent: 'flex-start' }]}>
            {/* <Image source={require('../img/icons/arrow-back.png')}
              style={{ width: 12.68, height: 21.12, tintColor: tintColor }} /> */}
            <Text style={[styles.button, { color: tintColor }, { opacity: !props.leftButtonDisabled ? 1 : 0.5}]}>{props.leftButtonTitle}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  const rightButton = () => {
    if (props.rightContent !== null) {
      return (
        <View style={[styles.button_wrap, { justifyContent: 'flex-end' }]}>
          {props.rightContent()}
        </View>
      )
    }

    if (props.rightButtonTitle !== null) {
      return (
        <TouchableOpacity onPress={props.onRightButtonPress} style={{ flex: 1 }} disabled={props.rightButtonDisabled}>
          <View style={[styles.button_wrap, { justifyContent: 'flex-end' }]}>
            <Text style={[styles.button, { color: tintColor }, { opacity: !props.leftButtonDisabled ? 1 : 0.5}]}>{props.rightButtonTitle}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  return (<BlurStatusBar
      light={props.light}
      static={props.static}
      {...props}
      style={[{ height: 64 }, props.style]}>
    <View style={styles.bar}>

      {/* LEFT BUTTON */}
      <View style={{ flex: 1 }}>{leftButton()}</View>

      {/* CENTER CONTENT */}
      <View style={{ flex: 1 }}>{props.children}</View>

      {/* RIGHT BUTTON */}
      <View style={{ flex: 1 }}>{rightButton()}</View>

    </View>
  </BlurStatusBar>)
}

BlurNavigator.propTypes = {
  light: PropTypes.bool,
  static: PropTypes.bool,
  onLeftButtonPress: PropTypes.func,
  leftButtonTitle: PropTypes.string,
  leftButtonDisabled: PropTypes.bool,
  onRightButtonPress: PropTypes.func,
  rightButtonTitle: PropTypes.string,
  rightButtonDisabled: PropTypes.bool,
  rightContent: PropTypes.any
}

BlurNavigator.defaultProps = {
  light: true,
  static: false,
  onLeftButtonPress: () => {},
  leftButtonTitle: null,
  leftButtonDisabled: false,
  onRightButtonPress: () => {},
  rightButtonTitle: null,
  rightButtonDisabled: false,
  rightContent: null,
}

const styles = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: 'transparent'
  },
  button_wrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.24,
    marginHorizontal: 6,
    textAlign: 'left'
  }
})

export default BlurNavigator
