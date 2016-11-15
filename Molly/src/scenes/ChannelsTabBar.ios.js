import React, { Component} from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  ScrollView, View,
} from 'react-native';

import ChannelCard from '../components/ChannelCard'

class ChannelsTabBar extends Component {

  state = {
    selectedTab: 'explore'
  }

  _renderContent = () => {
    return (
      <ScrollView>
        <View style={{ padding: 20 }}>
          <ChannelCard style={{ marginBottom: 20 }}/>
          <ChannelCard style={{ marginBottom: 20 }}/>
          <ChannelCard style={{ marginBottom: 20 }}/>
        </View>
      </ScrollView>
    )
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
          {this._renderContent()}
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
          {this._renderContent()}
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
          {this._renderContent()}
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
          {this._renderContent()}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

export default ChannelsTabBar
