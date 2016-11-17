//
//  SpotifyAPIBridge.m
//  Molly
//
//  Created by Aniruddh Bharadwaj on 11/17/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(SpotifyAPI, NSObject)

RCT_EXTERN_METHOD(authenticate:(NSString *)clientID redirectURL:(NSString *)redirectURL callback:(RCTResponseSenderBlock)block)

@end

