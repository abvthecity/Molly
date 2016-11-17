//
//  SpotifyAPI.swift
//  SpotifyFramework
//
//  Created by Rachit K on 11/15/16.
//  Copyright © 2016 Rachit Kataria. All rights reserved.
//

import UIKit

@objc(SpotifyAPI)
class SpotifyAPI: NSObject {
  
  var player: SPTAudioStreamingController!
  
  /* SPOTIFY AUTH SECTION */
  var auth: SPTAuth!
  
  @objc(authenticate:clientID:redirectURL:callback:)
  func authenticate(clientID: String!, redirectURL: String!, callback: RCTResponseSenderBlock) {
    // set auth and player
    self.auth = SPTAuth.defaultInstance();
    self.player = SPTAudioStreamingController.sharedInstance();
    
    // set clientID and redirectURL
    self.auth.clientID = clientID;
    self.auth.redirectURL = URL(string: redirectURL);
    self.auth.requestedScopes = [SPTAuthStreamingScope];
  }
}
