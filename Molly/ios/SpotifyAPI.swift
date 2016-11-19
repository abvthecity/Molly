//
//  SpotifyAPI.swift
//  SpotifyTestProj
//
//  Created by Aniruddh Bharadwaj on 11/17/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import SafariServices
import NotificationCenter

@objc(SpotifyAPI)
class SpotifyAPI: RCTEventEmitter, SPTAudioStreamingDelegate {
  
  /* SPOTIFY AUTH SECTION */
  var auth: SPTAuth!
  var session: SPTSession!
  var player: SPTAudioStreamingController!
  var authVC: UIViewController!
  
  // Notification Name
  let closeUserAuthVC: String! = "closeUserAuthVC"
  
  // First App Launch?
  var firstAppLaunch: Bool! = true
  
  // Authenticate User With Spotify
  @objc(authenticate:redirectURL:)
  func authenticate(clientID: String!, redirectURL: String) {
    // setup login with params
    SPTAuth.defaultInstance().clientID = clientID
    SPTAuth.defaultInstance().redirectURL = URL(string: redirectURL)
    SPTAuth.defaultInstance().sessionUserDefaultsKey = "current session"
    SPTAuth.defaultInstance().requestedScopes = [SPTAuthStreamingScope]
    
    // set notification name
      NotificationCenter.default.addObserver(self, selector: #selector(SpotifyAPI.afterAuthentication(notification:)), name: NSNotification.Name(rawValue: self.closeUserAuthVC), object: nil)
    
    // become controller's delegate
    SPTAudioStreamingController.sharedInstance().delegate = self
    
    // start streaming controller
    do {
      if SPTAudioStreamingController.sharedInstance().initialized {
        try SPTAudioStreamingController.sharedInstance().start(withClientId: clientID)
      }
    } catch {
      // something went wrong! figure out what to put here later!
    }
    
    // async auth call
    DispatchQueue.main.async {
      self.startAuthenticationFlow()
    }
  }
  
  // Authentication Helper for User Auth Flow
  func startAuthenticationFlow() {
    let urlToDisplay = SPTAuth.defaultInstance().spotifyWebAuthenticationURL()
    if #available(iOS 9.0, *) {
      self.authVC = SFSafariViewController.init(url: urlToDisplay!)
    } else {
      // Fallback on earlier versions
    }
    
    // display with help of appdelegate
    let appDelegate = UIApplication.shared.delegate as! AppDelegate
    appDelegate.window?.rootViewController?.present(self.authVC, animated: true, completion: nil)
  }
  
  // Authentication Helper for Post User Auth
  func afterAuthentication(notification: NSNotification) {
    if (notification.object as? SPTSession) != nil {
      // remove authVC with help of appdelegate
      let appDelegate = UIApplication.shared.delegate as! AppDelegate
      appDelegate.window?.rootViewController?.dismiss(animated: true, completion: nil)
      
      // get session from notification
      self.session = notification.object as? SPTSession
      
      // get auth and player from default and shared instances of respective classes
      self.auth = SPTAuth.defaultInstance()
      self.player = SPTAudioStreamingController.sharedInstance()
      
      // emit login success
      self.sendEvent(withName: "Login", body: ["success": true, "userSpotifyID": self.auth.session.canonicalUsername])
    } else {
      // remove authVC with help of appdelegate
      let appDelegate = UIApplication.shared.delegate as! AppDelegate
      appDelegate.window?.rootViewController?.dismiss(animated: true, completion: nil)

      // emit login failure
      self.sendEvent(withName: "Login", body: ["success": false, "userSpotifyID": "authFailure"])
    }
  }
  
  // Supported RCTEmitter Events
  override func supportedEvents() -> [String]! {
    return ["Login"]
  }
  
  /* SPOTIFY MUSIC PLAYBACK SECTION */
  
  // Song URI Queue
  var songURIQueue: [String]! = []
  
  // Get Music Categories (Tags)
  @objc(getTags:)
  func getTags(callback: @escaping RCTResponseSenderBlock) {
    // define Spotify categories (workaround around HTTP requests)
    let categories: [String]! = [
      "Mood", "Party", "Pop", "Rock",
      "Indie", "EDM/Dance", "Chill", "Sleep",
      "Hip Hop", "Workout", "RnB", "Country",
      "Metal", "Soul", "Jazz", "Blues"
    ]
    
    // return as part of callback
    callback([NSNull(), categories])
  }
  
  // Is Audio Currently Being Played?
  @objc(isPlaying:)
  func isPlaying(callback: @escaping RCTResponseSenderBlock) {
    // return play-state of streaming controller
    callback([NSNull(), self.player.playbackState.isPlaying])
  }
  
  // Length of Current Track
  @objc(lenCurrentTrack:)
  func lenCurrentTrack(callback: @escaping RCTResponseSenderBlock) {
    // return length of current track
    callback([NSNull(), self.player.playbackState.position])
  }
  
  // Play / Pause the Current Track
  @objc(setIsPlaying:callback:)
  func setIsPlaying(playState: Bool, callback: @escaping RCTResponseSenderBlock) {
    // set state of player
    self.player.setIsPlaying(playState, callback: { (error) in
      // handle error
      if error == nil {
        callback([NSNull()])
      } else {
        callback([error!])
      }
    })
  }
  
  // Skip Current Track
  @objc(skipTrack:)
  func skipTrack(callback: @escaping RCTResponseSenderBlock) {
    // skip current track through streaming controller
    self.player.skipNext { (error) in
      if error == nil {
        callback([NSNull()])
      } else {
        callback([error!])
      }
    }
  }
  
  // Play Music Given URI
  @objc(playURI:callback:)
  func playURI(songURI: String!, callback: @escaping RCTResponseSenderBlock) {
    // play music through streaming controller
    self.player.playSpotifyURI(songURI, startingWith: 0, startingWithPosition: 0, callback: { (error) in
      // handle error
      if error == nil {
        callback([NSNull()])
      } else {
        callback([error!])
      }
    })
  }
  
  // Get Metadata Given URI (REQUIRES PLAY URI BEFORE CALLS)
  @objc(getMetadata:)
  func getMetadata(callback: @escaping RCTResponseSenderBlock) {
    var metadataArr: [String] = []
    
    let trackName = self.player.metadata.currentTrack?.name
    let artistName = self.player.metadata.currentTrack?.artistName
    let albumName = self.player.metadata.currentTrack?.albumName
    let albumArt = self.player.metadata.currentTrack?.albumCoverArtURL
    let uri = self.player.metadata.currentTrack?.uri
    
    metadataArr.append(trackName!)
    metadataArr.append(artistName!)
    metadataArr.append(albumName!)
    metadataArr.append(albumArt!)
    metadataArr.append(uri!)
    
    callback([NSNull(), metadataArr])
  }
  
  // Get current track's seconds
  @objc(getCurrentSeconds:)
  func getCurrentSeconds(callback: @escaping RCTResponseSenderBlock) {
    callback([NSNull(), self.player.playbackState.position])
  }
  
  // Queue Music Given URI
  @objc(queueURI:)
  func queueURI(songURI: String!) {
    // add URI to end of songURIQueue
    songURIQueue.append(songURI)
  }
  
  // Get Next Song URI
  @objc(nextSongURI:)
  func nextSongURI(callback: @escaping RCTResponseSenderBlock) {
    // handle next song in queue (if it exists)
    if songURIQueue.count == 0 {
      // send targeted callback that queue is empty
      callback([NSNull(), "NoSongsInQueue"])
    } else {
      // remove and get first song from queue
      let nextSongURI: String! = songURIQueue.removeFirst()
      
      self.player.playSpotifyURI(nextSongURI, startingWith: 0, startingWithPosition: 0, callback: { (error) in
        
        // handle error
        if error == nil {
          callback([NSNull(), nextSongURI])
        } else {
          callback([error!, nextSongURI])
        }
      })
    }
  }
  
  // Search for Music
  @objc(searchForMusic:queryType:callback:)
  func searchForMusic(searchQuery: String!, queryType: String!, callback: @escaping RCTResponseSenderBlock) {
    // classify this request by queryType
    var searchType: SPTSearchQueryType!
    if queryType == "track" {
      searchType = SPTSearchQueryType.queryTypeTrack
    } else if queryType == "artist" {
      searchType = SPTSearchQueryType.queryTypeArtist
    } else if queryType == "album" {
      searchType = SPTSearchQueryType.queryTypeAlbum
    } else if queryType == "playlist" {
      searchType = SPTSearchQueryType.queryTypePlaylist
    }
    
    // execute request
    SPTSearch.perform(withQuery: searchQuery, queryType: searchType, accessToken: self.auth.session.accessToken, callback: { (error, data) in
      if error == nil {
        // downcast data to sptlistpage
        let results: [SPTPartialTrack]! = (data as! SPTListPage).items as! [SPTPartialTrack]!
        
        // calc max # of elements to return
        let numTracksToReturn: Int = (results.count < 5) ? results.count : 5
        
        // keep array of results (JSON) to send as response
        var response: [Dictionary<String, AnyObject>]! = [[:]]
        
        // iterate through results
        for i in 0 ..< numTracksToReturn {
          // get current sptpartialtrack
          let partialTrack: SPTPartialTrack! = results[i]
          
          // get info about this song (name, artist, album, uri)
          let trackName: String! = partialTrack.name
          let trackURI: String! = partialTrack.playableUri.absoluteString
          var trackArtists: [String]! = []
          for i in 0 ..< partialTrack.artists.count {
            let indivArtist: SPTPartialArtist! = partialTrack.artists[i] as! SPTPartialArtist
            trackArtists.append(indivArtist.name as String)
          }
          let trackAlbum: String! = partialTrack.album.name
          
          // construct dictionary
          var trackDictionary: Dictionary<String, AnyObject>! = [:]
          trackDictionary["name"] = trackName as AnyObject?
          trackDictionary["uri"] = trackURI as AnyObject?
          trackDictionary["artists"] = (trackArtists as NSArray?)?[0] as AnyObject?
          trackDictionary["album"] = trackAlbum as AnyObject?
          
          // append to response
          response.append(trackDictionary)
        }
        
        // send callback with no error and response
        callback([NSNull(), response])
      } else {
        // send callback with error and no response
        callback([error!, NSNull()])
      }
    })
  }
}
