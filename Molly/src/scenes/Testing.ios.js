import React, { PropTypes } from 'react'
import {
  View, Button
} from 'react-native'

import LandingScene from './LandingScene'
import ExploreScene from './ExploreScene'
import BroadcastScene from './BroadcastScene'

const Testing = props => {

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Button
        title="Landing"
        onPress={() => {
          props.navigator.push({
            title: 'Landing',
            component: LandingScene
          })
        }}
      />
      <Button
        title="Homepage"
        onPress={() => {
          props.navigator.push({
            title: 'Homepage',
            component: ExploreScene,
            leftButtonTitle: 'Back',
            onLeftButtonPress: () => props.navigator.pop()
          })
        }}
      />
      {/* <Button
        title="Favorites"
        onPress={() => {
          props.navigator.push({
            title: 'Favorites',
            component:
          })
        }}
      /> */}
      <Button
        title="Go LIVE"
        onPress={() => {
          props.navigator.push({
            title: 'Go LIVE',
            component: BroadcastScene
          })
        }}
      />
      {/* <Button
        title="Player"
        onPress={() => {
          props.navigator.push({
            title: 'Player',
            component:
          })
        }}
      /> */}
    </View>
  )

}

Testing.propTypes = {
  title: PropTypes.string,
  navigator: PropTypes.object.isRequired,
}

export default Testing
