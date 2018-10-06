# Simple Node.js, Express (REST API) Server

## Live demo: https://example-restapi-client.firebaseapp.com/
This is a simple example of a Back-End that takes requests from a client and sends data stored locally on the server back to the client. This data can be edited or added to by the client but if the server resets or goes to sleep, the data will be reloaded from memory (data is semi-stateless).

This project is meant to simulate fetching data from a database; good for learning how a Back-End API works with a Front-End, without having to worry about another stack like a database server. 

## 2-Part Project
This project works with another Front-End project [example-restapi-client](https://github.com/dieharders/example-restapi-client)

## Development server

Run `npm start` for a dev server (will use `nodemon server.js`). The API server will be available at `http://localhost:8080/` for your front-end to contact. The server will automatically reload if you change any of the source files.

# Live Deployment

## Setting Cross Origin Resource Sharing (CORS)

If you intend to host this server on a different domain than the Front-End, be sure to set the CORS options in `server.js`. Point the `hostUrl` to your Front-End's domain url.

## Server Host & Port ENV variables

Be sure to set ENV files to point to your Server's Host domain and port based on whatever hosting provider you deploy this server to (Heroku). The default host is `localhost`. The default port is `8080`.
