// Dependencies/Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const passport = require('passport');
const morgan = require('morgan');
// require('dotenv').config();
require('./auth/jwt')
require('./auth/strategy')

// Server Instantiation
const server = express();

// MiddleWare Queue
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(passport.initialize());
// server.use(morgan('dev'));

// Routes
server.use('/api', routes);

function errorHandler(err, req, res, next) {
    console.log("error handler", err);
    switch (err.statusCode) {
        case 404:
            res.status(404).json({
                message: 'The requested information could not be found'
            });
            break;
        case 400:
            res.status(400).json({
                message: 'The server cannot or will not process the request due to an apparent client error'
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