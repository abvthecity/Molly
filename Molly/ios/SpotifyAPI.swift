//
//  SpotifyAPI.swift
//  SpotifyFramework
//
//  Created by Rachit K on 11/15/16.
//  Copyright © 2016 Rachit Kataria. All rights reserved.
//

import UIKit
import SafariServices

@available(iOS 9.0, *)
@objc(SpotifyAPI)
class SpotifyAPI: NSObject, SPTAudioStreamingDelegate {
  
  var player: SPTAudioStreamingController!
  
  /* SPOTIFY AUTH SECTION */
  var auth: SPTAuth!
  var authVC: SFSafariViewController!
  
  @objc(clientID:redirectURL:callback:)
  func authenticate(clientID: String!, redirectURL: String!, callback: RCTResponseSenderBlock) {
    // set auth and player
    self.auth = SPTAuth.defaultInstance();
    self.player = SPTAudioStreamingController.sharedInstance();
    
    // set clientID and redirectURL
    self.auth.clientID = clientID;
    self.auth.redirectURL = URL(string: redirectURL);
    self.auth.requestedScopes = [SPTAuthStreamingScope];
    
    // become the delegate to the streaming controller
    self.player.delegate = self
    
    // start player
    do {
      try self.player.start(withClientId: self.auth.clientID)
    } catch {
      // do nothing!
    }
    
    // start auth on main thread
    DispatchQueue.main.async {
      self.startUserAuth()
    }
  }
  
  // auth helper
  func startUserAuth() {
    // if sesh is valid, login with existing token
    if (self.auth.session.isValid()) {
      self.player.login(withAccessToken: self.auth.session.accessToken)
    } else {
      // construct login url and open in sfvc
      var loginURL: URL = self.auth.spotifyWebAuthenticationURL()
      self.authVC = SFSafariViewController.init(url: loginURL)
      let delegate = UIApplication.shared.delegate as! AppDelegate
      delegate.window.rootViewController?.present(self.authVC, animated: true, completion: nil);
    }
  }
  
  @objc(playing:callback:)
  func setIsPlaying(playing:Bool, callback:@escaping RCTResponseSenderBlock) {
    self.player.setIsPlaying(playing) { (error) -> Void in
      
      if error == nil {
        // Pause
        callback([NSNull(), NSNull()])
        
      } else {
        print("Failed to stop spotify player: " + (error?.localizedDescription)!)
        callback([error!, NSNull()])
        
        self.checkSession()
      }
    }
  }
  
  @objc(callback:)
  func getCurrentSeconds(callback:RCTResponseSenderBlock) {
     callback([NSNull(), self.player.playbackState.position])
  }
  
  //Check if session is valid and renew it if not
  func checkSession() {
    if(self.auth.session.isValid()) {
      self.auth.renewSession(auth.session, callback: { (error, session) in
        if(error != nil) {
          print(error!)
//          [sharedManager startAuth:sharedManager.clientID setRedirectURL:sharedManager.myScheme setRequestedScopes:sharedManager.requestedScopes];
//        } else {
//          [sharedManager setSession:session];
//          [[sharedManager player] loginWithAccessToken:session.accessToken];
//        }
//      }];

        }
      })
    }
  }
}
