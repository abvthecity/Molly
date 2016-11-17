import React, { Component } from 'react'
import {
  View, ScrollView, Text,
  ProgressViewIOS, ListView,
  StyleSheet
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import constants from '../common/constants'
import Card from '../components/Card'
import BlurNavigator from '../components/BlurNavigator'
import BlurStatusBar from '../components/BlurStatusBar'

class ListViewObj extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
    );
  }
}

class PlayerScene extends Component {

  render () {
    return (
      // <LinearGradient colors={['white', '#F0F0F0']} style={{ flex: 1 }} {...this.props}>
      <View {...this.props} style={[{ flex: 1, backgroundColor: 'black' }, this.props.style]}>
        <BlurNavigator
          light={true}
          dark={true}
          // static={true}
          onLeftButtonPress={this.props.goBack}
          leftButtonTitle="Exit">
          <Text style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '900',
            textAlign: 'center'
          }}>TopKek</Text>
          <Text style={{
            color: 'white',
            fontSize: 11,
            fontWeight: '500',
            textAlign: 'center'
          }}>Rachit Kataria</Text>
        </BlurNavigator>
        {/* <BlurStatusBar light={true} dark={true} /> */}

        <ScrollView style={{ flex: 1, backgroundColor: 'transparent', paddingTop: 44 }}>
          <Card shadow={true} style={[styles.card_object, { zIndex: 2}]}>
            <View style={styles.card_object_inner}>

              <View style={{
                position: 'absolute',
                top: 2,
                left: 0,
                right: 0
              }}>
                <Text style={{
                  flex: 1,
                  fontSize: 11,
                  fontWeight: '500',
                  color: '#FF2D55',
                  textAlign: 'center'
                }}>LIVE</Text>
              </View>

              <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                width: 343,
                height: 343,
                borderRadius: constants.borderRadiusMd,
                overflow: 'hidden'
              }}/>

              <View style={{ marginTop: constants.unit * 6 }}>
                <ProgressViewIOS
                  progress={0.8}
                  progressTintColor={'#FF2D55'}
                  trackTintColor={'#E5E5E5'}
                />
                <View style={styles.under_bar}>
                  <Text style={styles.under_bar_text}>0:15</Text>
                  <Text style={styles.under_bar_text}>-2:53</Text>
                </View>
              </View>

              <View style={{ marginVertical: constants.unit * 2 }}>
                <Text style={{ fontSize: 24, fontWeight: '700', color: 'black'}}>Lost in the World</Text>
                <Text style={{ fontSize: 24, fontWeight: '500', color: '#808080'}}>Kanye West</Text>
              </View>
            </View>

            <View style={styles.separator}/>

            <View style={styles.card_object_inner}>
              <Text style={{ fontSize: 24, fontWeight: '900' }}>Up Next</Text>
              <ListViewObj />
            </View>
          </Card>
        </ScrollView>
      </View>
      // </LinearGradient>
    )
  }

}

const styles = StyleSheet.create({
  card_object: {
    // marginHorizontal: constants.unit * 2,
    // marginBottom: constants.unit * 3
  },
  card_object_inner: {
    padding: constants.unit * 4
  },
  under_bar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: constants.unit
  },
  under_bar_text: {
    fontSize: 13,
    fontWeight: '500',
    color: '#88888D',
    letterSpacing: 0.4
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#BFBFBF'
  },
})

export default PlayerScene
