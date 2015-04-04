'use strict';

// Set Up
var express = require('express');
var app = express();
var path = require('path');

var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var session = require('express-session');


require('./Configuration')(express,app,path,mongoose,cookieParser,bodyParser);

//with session
//require('./Configuration')(express,app,path,mongoose,cookieParser,bodyParser,session);

//Initialize the main Router
var router = express.Router();
require('./API/APIGateway.js')(app, path, router);

// Server Initialization
var port = process.env.PORT || 9000;

app.listen(port);
