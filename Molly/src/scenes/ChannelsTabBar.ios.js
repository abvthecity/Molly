import React, { Component} from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  ScrollView, View,
  TouchableHighlight,
  PropTypes
} from 'react-native';

import { BlurView } from 'react-native-blur'

import FavoritesScene from './FavoritesScene'
import ExploreScene from './ExploreScene'
import BroadcastScene from './BroadcastScene'
import MoreScene from './MoreScene'

class ChannelsTabBar extends Component {

  state = {
    selectedTab: 'explore'
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          icon={require('../img/icons/star.png')}
          title="Favorites"
          selected={this.state.selectedTab === 'favorites'}
          onPress={() => {
            this.setState({
              selectedTab: 'favorites',
            });
          }}>
          <FavoritesScene />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('../img/icons/music.png')}
          title="Explore"
          selected={this.state.selectedTab === 'explore'}
          onPress={() => {
            this.setState({
              selectedTab: 'explore'
            });
          }}>
          <ExploreScene />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('../img/icons/radio.png')}
          title="Broadcast"
          selected={this.state.selectedTab === 'broadcast'}
          onPress={() => {
            this.setState({
              selectedTab: 'broadcast'
            });
          }}>
          <BroadcastScene />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('../img/icons/more.png')}
          title="More"
          selected={this.state.selectedTab === 'more'}
          onPress={() => {
            this.setState({
              selectedTab: 'more'
            });
          }}>
          <MoreScene />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

// ChannelsTabBar.propTypes = {
//   title: PropTypes.string,
//   navigator: PropTypes.object.isRequired,
// }

export default ChannelsTabBar
