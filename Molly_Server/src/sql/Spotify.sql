Drop Database IF exists SpotifyDJ;
CREATE DATABASE SpotifyDJ;
use SpotifyDJ;

CREATE TABLE `SpotifyDJ`.`Users` (
  `clientID` VARCHAR(10) NOT NULL,
  `clientTags` VARCHAR(1000) NOT NULL,
  `clientDJ` bool NULL,
  `clientBookmarks` VARCHAR(1000) NULL,
  PRIMARY KEY (`clientID`));
  
  CREATE TABLE `SpotifyDJ`.`Channel` (
  `clientID` VARCHAR(20) NOT NULL,
  `channelTags` Varchar(1000) Null,
  `subscribersNum` int NULL,
  `likesNum` int NULL,
  PRIMARY KEY (`clientID`));
  
CREATE TABLE `SpotifyDJ`.`channelTags` (
  `channelTag` VARCHAR(100) NOT NULL,
  `channelClientID` VARCHAR(1000) NULL,
  PRIMARY KEY (`channelTag`));



--   `songURIPlaylist` BLOB NULL