//
//  SpotifyAPIBridge.m
//  SpotifyTestProj
//
//  Created by Aniruddh Bharadwaj on 11/17/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(SpotifyAPI, NSObject)

RCT_EXTERN_METHOD(getClientID:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getAccessToken:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(authenticate:(NSString *)clientID redirectURL:(NSString *)redirectURL)
RCT_EXTERN_METHOD(userHasAuth:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(getTags:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(isLoggedIn:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(isPlaying:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(lenCurrentTrack:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(setIsPlaying:(BOOL)playState callback:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(skipTrack:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(playURI:(NSString *)songURI timeToStart:(nonnull NSNumber *)timeToStart callback:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(queueURI:(NSString *)songURI)
RCT_EXTERN_METHOD(nextSongURI:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(searchForMusic:(NSString *)searchQuery queryType:(NSString *)queryType callback:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getMetadata:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getMetadata:(NSString *)songURI callback:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getCurrentSeconds:(RCTResponseSenderBlock)callback)

@end
