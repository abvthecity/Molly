# CS 201 Student Repository

- **Name**: Tommy Trojan
- **USC ID**: 1234567890
- **Email**: ttrojan@usc.edu

Members: Andrew Jiang, Aniruddh Bharadwaj, Rachit Kataria, Shivangi Goel, Lernik Tahmasian

Email’s: andrewji@usc.edu, aniruddh@usc.edu, rachitka@usc.edu, goelshiv@usc.edu, ltahmasi@usc.edu

Installation Requirements
1) Tomcat
2) Eclipse IDE for Java Developers
3) Xcode

How to Deploy
1) Download the repository as a zip file
2) The Xcode project can be run by opening Molly.xcodeproj in Xcode and running the application using the ‘Cmd+R’ shortcut or the ‘Run Application’ button in Xcode. The build may fail if all npm dependencies have not been installed, which can be done by navigating to Molly/ and running the terminal command ‘npm install’, which should begin to download and install dependencies.
3) The application can also be run by typing in ‘react-native run-ios’ into the Terminal as well. Running the application for the first time may take a while, as Xcode has to parse through the project.
4) For running the Java HTTP server, you must change the build path for the installation of Tomcat you have running on your computer.

Our project is composed of React, Swift, and Javascript. The workflow is as follows: a client (either a listener or a DJ) will invoke a certain action in the Java backend, which is then propagated to the server and then delegated to the Javascript UI code. If the action requires information from Spotify, Javascript will call our Swift code which then sends HTTP requests to Spotify’s API. This information then is propagated back up the ladder.  

Enjoy!
