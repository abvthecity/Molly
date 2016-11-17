import React, { PropTypes } from 'react'
import {
  View, Button
} from 'react-native'

import ExploreScene from './ExploreScene'

const Testing = props => {

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      {/* <Button
        title="Landing"
        onPress={() => {
          props.navigator.push({
            title: 'Landing',
            component:
          })
        }}
      /> */}
      <Button
        title="Homepage"
        onPress={() => {
          props.navigator.push({
            title: 'Homepage',
            component: ExploreScene
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
      />
      <Button
        title="Go LIVE"
        onPress={() => {
          props.navigator.push({
            title: 'Go LIVE',
            component:
          })
        }}
      />
      <Button
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
