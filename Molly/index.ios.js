/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  NativeModules,
  NativeEventEmitter,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var SpotifyAPI = NativeModules.SpotifyAPI;
this.eventEmitter = new NativeEventEmitter(NativeModules.SpotifyAPI);
this.eventEmitter.addListener('Login', (res) => {
  if (res.success == true) {
    console.log("Client ID: " + res.userSpotifyID);
  } else {
    console.log("failed to login");
  }
});

export default class SpotifyTestProj extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.normalText}>
          React Native Spotify Module Basic Example!
        </Text>
        <TouchableHighlight style={styles.button} onPress={() => SpotifyAPI.authenticate('b9aa2793ac1a476ea7ed07175f38a6dd', 'molly://callback')}>
          {/*<Image resizeMode ={'contain'}
            style={styles.image}
            source={require('./assets/login-button-mobile.png')}
          />*/}
          <Text>PLES LOGIN</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => SpotifyAPI.playURI('spotify:track:1OAYKfE0YdrN7C1yLWaLJo', (error) => {
            console.log(error);
          })
        }>
          <Text style={styles.normalText}>
            Play some music!
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => SpotifyAPI.getMetadata((error, metadataArr) => {
            console.log(metadataArr);
          })
        }>
          <Text style={styles.normalText}>
            Get Song Metadata!
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => SpotifyAPI.getCurrentSeconds((error, seconds) => {
            console.log(seconds);
          })
        }>
          <Text style={styles.normalText}>
            Current time of song!
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 45,
    borderRadius: 64
  },
  image: {
    width: 250,
    height: 50
  },
  normalText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },

});

AppRegistry.registerComponent('SpotifyTestProj', () => SpotifyTestProj);