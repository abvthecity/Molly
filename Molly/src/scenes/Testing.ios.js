import React, { PropTypes } from 'react'
import {
  View, Button
} from 'react-native'

import LandingScene from './LandingScene'
import ExploreScene from './ExploreScene'
import BroadcastScene from './BroadcastScene'
import FavoritesScene from './FavoritesScene'
import PlayerScene from './PlayerScene'

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
            component: ExploreScene
          })
        }}
      />
      <Button
        title="Favorites"
        onPress={() => {
          props.navigator.push({
            title: 'Favorites',
            component: FavoritesScene,
            passProps: {
              goBack: e => {
                props.navigator.pop()
              }
            }
          })
        }}
      />
      <Button
        title="Go LIVE"
        onPress={() => {
          props.navigator.push({
            title: 'Go LIVE',
            component: BroadcastScene,
            passProps: {
              goBack: e => {
                props.navigator.pop()
              }
            }
          })
        }}
      />
      <Button
        title="Player"
        onPress={() => {
          props.navigator.push({
            title: 'Player',
            component: PlayerScene,
            passProps: {
              goBack: e => {
                props.navigator.pop()
              }
            }
          })
        }}
      />
    </View>
  )

}

Testing.propTypes = {
  title: PropTypes.string,
  navigator: PropTypes.object.isRequired,
}

export default Testing
