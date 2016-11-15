import React, { Component} from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  ScrollView, View,
} from 'react-native';

class ChannelsTabBar extends Component {

  state = {
    selectedTab: 'explore'
  }

  _renderContent = () => {
    return (
      <ScrollView>
        <View>
          <Text>{this.state.selectedTab}</Text>
        </View>
      </ScrollView>
    )
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          systemIcon="favorites"
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
          systemIcon="most-viewed"
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
          systemIcon="more"
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
