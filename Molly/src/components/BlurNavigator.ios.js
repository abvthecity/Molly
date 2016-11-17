import React, { PropTypes } from 'react'
import {
  View, TouchableOpacity, Image, Text
} from 'react-native'

import BlurStatusBar from './BlurStatusBar'

const BlurNavigator = props => {

  let tintColor = '#007AFF'

  if (props.light === true) {
    tintColor = 'white'
  }

  return (<BlurStatusBar
      light={props.light}
      static={props.static}
      {...props}
      style={[{ height: 64 }, props.style]}>
    <View style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      backgroundColor: 'transparent'
    }}>

      {/* LEFT BUTTON */}
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={props.onLeftButtonPress} style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../img/icons/arrow-back.png')}
              style={{ width: 12.68, height: 21.12, tintColor: tintColor }} />
            <Text style={{
              fontSize: 17,
              fontWeight: '600',
              color: tintColor,
              letterSpacing: -0.24,
              marginHorizontal: 6
            }}>{props.leftButtonTitle}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* CENTER CONTENT */}
      <View style={{ flex: 1 }}>{props.children}</View>

      {/* RIGHT BUTTON */}
      <View style={{ flex: 1 }}/>

    </View>
  </BlurStatusBar>)
}

BlurNavigator.propTypes = {
  light: PropTypes.bool,
  static: PropTypes.bool,
  onLeftButtonPress: PropTypes.func,
  leftButtonTitle: PropTypes.string
}

export default BlurNavigator
