import React, { PropTypes } from 'react'
import {
  View, Image,
  StyleSheet
} from 'react-native'

const BlurredBackgroundImage = props => (
  <View {...props} style={[props.style, styles.card_image]}>
    <View style={styles.card_image_wrap}>
      <Image source={props.image}
        blurRadius={10}
        style={styles.card_image_img}>
        {props.children}
      </Image>
    </View>
  </View>
)

BlurredBackgroundImage.propTypes = {
  image: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  card_image: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  card_image_wrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card_image_img: {
    flex: 1,
    resizeMode: 'cover',
    position: 'relative',
    zIndex: 1
  }
})

export default BlurredBackgroundImage
