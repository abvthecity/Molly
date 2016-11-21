import React, { PropTypes } from 'react'
import {
  View, TouchableOpacity, Image, Text,
  StyleSheet
} from 'react-native'

import BlurStatusBar from './BlurStatusBar'
import Button from './Button'

const BlurNavigator = props => {

  let tintColor = '#007AFF'

  if (props.light === true) {
    tintColor = 'white'
  }

  const leftButton = () => {
    if (props.leftButtonTitle !== null) {
      return (
        <View style={[styles.button_wrap, { justifyContent: 'flex-start' }]}>
          <Button
            onPress={props.onLeftButtonPress}
            style={{ flex: 1}}
            tintColor={tintColor}
            textStyle={{ textAlign: 'left' }}
            disabled={props.leftButtonDisabled}>
            {props.leftButtonTitle}
          </Button>
        </View>
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
        <View style={[styles.button_wrap, { justifyContent: 'flex-end' }]}>
          <Button
            onPress={props.onRightButtonPress}
            style={{ flex: 1}}
            tintColor={tintColor}
            textStyle={{ textAlign: 'right' }}
            disabled={props.rightButtonDisabled}>
            {props.rightButtonTitle}
          </Button>
        </View>
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
      <View style={{ flex: 2 }}>{props.children}</View>

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
  }
})

export default BlurNavigator
