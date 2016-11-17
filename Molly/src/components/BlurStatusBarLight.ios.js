import React from 'react'
import {
  StatusBar
} from 'react-native'

import { BlurView } from 'react-native-blur'

const BlurStatusBarLight = props => (
  <BlurView {...props}
    blurType="light"
    blurAmount={27.18}
    style={[{
      height: 20,
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 999
    }, props.style]}>
    <StatusBar barStyle="dark-content" />
  </BlurView>
)

export default BlurStatusBarLight
