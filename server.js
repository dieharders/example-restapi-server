//** This is the back-end for the front-end project 'example-restapi-client' **//
//** This server handles requests from client for non-persistent data stored locally (no external DB) **//
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// Setup CORS
const cors = require('cors');
const hostUrl = process.env.CLIENT || 'http://localhost:4200';
const corsOptions = {
  origin: hostUrl,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Add routes
require('./app/routes/customer.routes.js')(app);

// Set server ports/host
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080; // listen on default or Heroku port
// Create a Server
const server = app.listen(port, function () {
  // Server has started!
  console.log("App listening at http://", host, ':', port);
});