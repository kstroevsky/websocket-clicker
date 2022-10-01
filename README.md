# hivex-websocket-clicker
 ## About
 It is a web application based on [React](https://github.com/facebook/react) and bootstrapped with [Create React App](https://github.com/facebook/create-react-app). This project provide multiplayer ability to a simply Clicker (Counter) functionality with WebSockets API provided as [Socket.IO](https://github.com/socketio/socket.io) library.
 You can create user, game (with room limit and duration) and join the game by another user (i.e. by another browser).
 ## Goals
 - add store (Mobx) to memorizing user and game params and reduce params from URL **(issue https://github.com/kstroevsky/hivex-websocket-clicker/issues/8)**
 - add style switching **(issue https://github.com/kstroevsky/hivex-websocket-clicker/issues/9)**
 - add more tests  **(issue https://github.com/kstroevsky/hivex-websocket-clicker/issues/11)**
 - try to move the project from socket.io to WebSocket API **(issue https://github.com/kstroevsky/hivex-websocket-clicker/issues/15)**
 - try to dockerize project **(issue https://github.com/kstroevsky/hivex-websocket-clicker/issues/14)**
 - deploy on heroku/vercel **(issue https://github.com/kstroevsky/hivex-websocket-clicker/issues/10)**
 ## Contributing
 Unfortunately, now we haven't enough tests and testing pipeline or another CI-pipelines. But we add their soon **(issue https://github.com/kstroevsky/hivex-websocket-clicker/issues/11)**.
 ## Getting Started
 ### Backend
 **Open the _first_ terminal tab and use follow instructions:**
 #### install requirements packages
 - **nodemon:**
 `npm install -g nodemon`
 or
 `yarn global add nodemon`
 - **other:**
 `npm install`
 or
 `yarn`
 #### dev mode
 `yarn dev` or `npm run dev`
 #### product mode
 `yarn start` or `npm run start`
 ### Frontend
 **Open the _second_ terminal tab and use follow instructions:**
 - `cd client`
 #### short:
 - `npm install` or `yarn`
 - `npm run start` or `yarn start`
 #### long:
 See here: [Frontend README](https://github.com/kstroevsky/hivex-websocket-clicker/blob/main/client/README.md)
