import React, { PropTypes } from 'react'
import {
  StatusBar, View, StyleSheet
} from 'react-native'

import { BlurView } from 'react-native-blur'

const BlurStatusBar = props => {

  let statusbar = <StatusBar barStyle={(props.light || props.dark) ? 'light-content' : 'dark-content'} animated={true} />

  if (props.static === true) {

    return (
      <View {...props} style={[styles.position, {zIndex: 1}, props.style]}>
        {statusbar}
        {props.children}
      </View>
    )

  } else {

    let blurType = props.light ? 'light' : 'xlight'

    if (props.dark) blurType = 'dark'

    return (
      <BlurView {...props}
        blurType={blurType}
        blurAmount={27.18}
        style={[styles.position, { zIndex: 999 }, props.style]}>
        {statusbar}
        {props.children}
      </BlurView>
    )

  }
}

BlurStatusBar.propTypes = {
  light: PropTypes.bool, // true:
  dark: PropTypes.bool,
  static: PropTypes.bool
}

BlurStatusBar.defaultProps = {
  light: false,
  dark: false,
  static: false
}

const styles = StyleSheet.create({
  position: {
    height: 20,
    paddingTop: 20,
    position: 'absolute',
    left: 0,
    right: 0
  }
})

export default BlurStatusBar
