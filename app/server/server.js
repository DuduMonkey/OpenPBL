/*global require, process*/
'use strict';

// Basic Modules in use
var express = require('express');
var app = express();
var path = require('path');

var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Start the configurations
require('./Configuration')(express, app, path, mongoose, cookieParser, bodyParser);

// Set the main router
var router = express.Router();
require('./api/APIGateway.js')(app, path, router);

// Server Initialization
var port = process.env.PORT || 9000;
app.listen(port);
