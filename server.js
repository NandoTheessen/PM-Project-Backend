// Dependencies/Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const passport = require('passport')
require('dotenv').config();
require('./auth/jwt')
require('./auth/google')

// Server Instantiation
const server = express();

// MiddleWare Queue
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(passport.initialize());

// Routes
server.use('/api', routes);

function errorHandler(err, req, res, next) {
    console.log(err);
    switch (err.statusCode) {
      case 404:
        res.status(404).json({
          message: 'The requested information could not be found'
        });
        break;
      default:
        res.status(500).json({
          message: 'There was an error performing the specified operation'
        });
        break;
    }
  }

server.use(errorHandler);


module.exports = {
    server
};