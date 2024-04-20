# Software-Construction-Project

Movie Watching Project for Software Construction class (CS 372)

## Building

To use this project:

Docker:

- Clone the repo
- `cd` into the cloned repo
- Run `docker build .`
- Run `docker compose up`
- Access the project at `localhost:8080`

Manually:

- Clone the repo
- `cd` into the cloned repo
- Install [NodeJS](https://nodejs.org/en)
- Install dependencies with `npm install cors express http js-sha256 jsdom mongoose`
- Start the project with `node server.js`
- Install and start a [MongoDB server](https://www.mongodb.com/try/download/community)
- Access the project at `localhost:8080`
