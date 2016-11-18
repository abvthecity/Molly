import React, { Component, PropTypes } from 'react'
import {
  View, ScrollView,
  Image, Text,
  TouchableOpacity, TouchableHighlight,
  StyleSheet
} from 'react-native'

import constants from '../common/constants'
import LinearGradient from 'react-native-linear-gradient'
import BlurNavigator from '../components/BlurNavigator'
import { BlurView, VibrancyView } from 'react-native-blur'

class FavoritesScene extends Component {

  static propTypes = {
    goBack: PropTypes.func
  }

  render() {
    const header = (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Text style={{ color: 'white', fontSize: 40, fontWeight: '300' }}>My <Text style={{fontWeight: '900'}}>Favorites</Text></Text>
      </View>
    )

    return (
      <LinearGradient colors={['#FFA832', '#FF5F33']} {...this.props} style={[{ flex: 1 }, this.props.style]}>
        <BlurNavigator light={true} onLeftButtonPress={this.props.goBack} leftButtonTitle="Back"/>
        <ScrollView style={{ backgroundColor: 'transparent', flex: 1, paddingTop: constants.navpad + 20 }}>
          <View style={{ padding: constants.unit * 4 }}>{header}</View>
        </ScrollView>
      </LinearGradient>
    )
  }

}

export default FavoritesScene
