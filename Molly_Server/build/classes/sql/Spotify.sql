Drop Database IF exists SpotifyDJ;
CREATE DATABASE SpotifyDJ;
use SpotifyDJ;

CREATE TABLE `SpotifyDJ`.`Users` (
`clientID` VARCHAR(10) NOT NULL,
`clientDJ` bool NULL,
PRIMARY KEY (`clientID`)
);

CREATE TABLE `SpotifyDJ`.`Channel` (
`clientID` VARCHAR(20) NOT NULL,
`channelName` varchar(45),
`channelTags` Varchar(1000) Null,
`subscribersNum` int NULL,
`likesNum` int NULL,
PRIMARY KEY (`clientID`)
);

CREATE TABLE `SpotifyDJ`.`Favorite` (
`favoriteID` INT NOT NULL AUTO_INCREMENT,
`clientID` VARCHAR(100) NOT NULL,
`channelID` VARCHAR(100) NULL,
PRIMARY KEY (`favoriteID`),
FOREIGN KEY (`clientID`) REFERENCES `Users`(`clientID`),
FOREIGN KEY (`channelID`) REFERENCES `Users`(`clientID`)
);