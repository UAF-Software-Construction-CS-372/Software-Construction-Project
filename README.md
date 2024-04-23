# Software-Construction-Project

Movie Watching Project for Software Construction class (CS 372)

## Building

To use this project:

+ Clone the repo
+ Install [NodeJS](https://nodejs.org/en)
+ Install dependencies with `npm install cors express http js-sha256 jsdom mongoose`
+ Start the project with `node server.js`
+ Install and start a [MongoDB server](https://www.mongodb.com/try/download/community)
+ Access the project at `localhost:8080`

Extra Notes:

+ When Adding a Movie, the Content Creator should use an embed link:
+ + Under the YouTube Video, click the share button
+ + Click the embed button ( has '<>' on it)
+ + Find `src="..."` and copy what is between the quotes and use that for the link
+ To change the user role
+ + Go into the MongoBD database
+ + 