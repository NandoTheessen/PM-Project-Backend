const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const routes = require('./routes');


const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

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