Drop Database SpotifyDJ;
CREATE DATABASE SpotifyDJ;
use SpotifyDJ;

CREATE TABLE `SpotifyDJ`.`Users` (
  `clientID` VARCHAR(10) NOT NULL,
  `clientTags` VARCHAR(1000) NOT NULL,
  `clientDJ` bool NULL,
  `clientBookmarks` VARCHAR(1000) NULL,
  PRIMARY KEY (`clientID`));
  
  CREATE TABLE `SpotifyDJ`.`Channel` (
  `clientID` VARCHAR(20) NULL,
  `channelTags` Varchar(1000) Null,
  `subscribersNum` int NULL,
  `likesNum` int NULL);
  
CREATE TABLE `SpotifyDJ`.`channelTags` (
  `channelTag` VARCHAR(100) NOT NULL,
  `channelTagcol` VARCHAR(1000) NULL,
  PRIMARY KEY (`channelTag`));



--   `songURIPlaylist` BLOB NULL