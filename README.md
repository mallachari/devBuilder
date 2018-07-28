# devBuilder

**The purpose of the app is to provide a simple interface for companies to request their need of development skills.**

This app is built with React/Redux. It communicates with backend responsible for data storage, authorization and orders management.

Backend was written with Node.js. It uses Modgodb for data storage, Express for REST exposition and express-graphql for GraphQL server implementation. All operations are available within REST and GrapghQL queries.

The next steps are adding GraphQL implementation of the client and to create the same front end with Angular.

Current version is accessible [here](https://devbuilderapp.firebaseapp.com).
Backend runs [here](https://afternoon-sea-82497.herokuapp.com).

## Instalation of React app
App was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and runs with webpack.

Configuration is stored in config/config.dev.json and config/config.prod.json files and is accessible through config object (added as external export to webpack).

Configuration:
- `serverUrl` - backend URL

To run:
- Edit configuration for dev and prod environments
- Install dependencies with `npm install`
- Run `npm start`

## Instalation of Node app

Configuration is stored in config/config.json file and accessible with config/config.js file.

Configuration:
- `PORT` - port application runs on
- `MONGODB_URI` - URI to mongodb 
- `JWT_SECRET` - JWT secret

To run:
- Start MongoDB instance
- Edit cofiguration file for test, dev and prod environments
- Install dependencies with `npm install`
- Run `npm start`