import React, { PropTypes } from 'react'
import {
  View, Text,
  StyleSheet
} from 'react-native'

import constants from '../common/constants'

const CardInfoContent = props => (
  <View {...props} style={styles.card_content}>

    {/* HEADING */}
    <View style={styles.content_heading}>
      <Text style={[styles.heading1, styles.text_shadow]}>{props.title}</Text>
      <Text style={[styles.heading2, styles.text_shadow]}>hosted by <Text style={{ fontWeight: 'bold' }}>{props.host}</Text></Text>
    </View>

    {/* LABELS */}
    <View style={styles.content_labels}>
      <Text style={[styles.xs_heading]}>{props.distance}</Text>
      {(() => {
        if (props.live) {
          return (
            <View style={styles.live_wrap}>
              <Text style={[styles.xs_heading, styles.live]}>LIVE</Text>
            </View>
          )
        }
      })()}
    </View>

    {/* NESTED COMPONENTS */}
    {props.children}

  </View>
)

CardInfoContent.propTypes = {
  title: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  live: PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
  card_content: {
    minHeight: 92.5
  },
  content_heading: {
    padding: constants.unit * 2,
  },
  content_labels: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: constants.unit,
    right: constants.unit
  },
  heading1: {
    color: 'white',
    fontSize: 18
  },
  heading2: {
    color: 'white',
    fontSize: 12
  },
  xs_heading: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'white'
  },
  live_wrap: {
    padding: 1,
    marginLeft: constants.unit,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: constants.borderRadiusSm,
    overflow: 'hidden'
  },
  live: {
    paddingTop: 2.5,
    paddingBottom: 2.5,
    paddingLeft: 3.5,
    paddingRight: 3.5,
    borderRadius: constants.borderRadiusSm,
    backgroundColor: '#C41200',
    overflow: 'hidden'
  },
  text_shadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 2,
    // overflow: 'auto'
  }
})

export default CardInfoContent
