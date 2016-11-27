Drop Database IF exists SpotifyDJ;
CREATE DATABASE SpotifyDJ;
use SpotifyDJ;

CREATE TABLE `SpotifyDJ`.`Users` (
`clientID` VARCHAR(50) NOT NULL,
`clientDJ` bool NULL,
PRIMARY KEY (`clientID`)
);

CREATE TABLE `SpotifyDJ`.`Channel` (
`clientID` VARCHAR(50) NOT NULL,
`channelName` varchar(50),
`subscribersNum` int NULL,
`likesNum` int NULL,
`dislikesNum` int NULL,
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
INSERT INTO `SpotifyDJ`.`Users` (`clientID`, `clientDJ`) VALUES ('5K4W6rqBFWDnAN6FQUkS6x', '0');
INSERT INTO `SpotifyDJ`.`Users` (`clientID`, `clientDJ`) VALUES ('20r762YmB5HeofjMCiPMLv', '0');
INSERT INTO `SpotifyDJ`.`Users` (`clientID`, `clientDJ`) VALUES ('20r765sfweHeofjMCiPMLv', '0');
INSERT INTO `SpotifyDJ`.`Users` (`clientID`, `clientDJ`) VALUES ('gsjgwertwgwgwgwgwfwdwd', '0');
INSERT INTO `SpotifyDJ`.`Users` (`clientID`, `clientDJ`) VALUES ('2Im64pIz6m0EJKdUe6eZ8r', '1');
INSERT INTO `SpotifyDJ`.`Users` (`clientID`, `clientDJ`) VALUES ('sdfsyusofus9ds8dg0df8g9d0g', '1');
INSERT INTO `SpotifyDJ`.`Users` (`clientID`, `clientDJ`) VALUES ('aacsrwsdsrw23desfdsf2wsdf2', '1');

INSERT INTO `SpotifyDJ`.`Channel` (`clientID`, `channelName`, `subscribersNum`, `likesNum`) VALUES ('aacsrwsdsrw23desfdsf2wsdf2', 'channelname2', '0', '0');
INSERT INTO `SpotifyDJ`.`Channel` (`clientID`, `channelName`, `subscribersNum`, `likesNum`) VALUES ('sdfsyusofus9ds8dg0df8g9d0g', 'channelname4', '0', '0');
INSERT INTO `SpotifyDJ`.`Channel` (`clientID`, `channelName`, `subscribersNum`, `likesNum`) VALUES ('2Im64pIz6m0EJKdUe6eZ8r', 'channelname3', '0', '0');

