'use strict';

// Environment & Configuration Variables
var environment = process.env.NODE_ENV;
var databaseURI = process.env.CONN_STRING;
var sessionSecret = process.env.APP_SECRET;

// Set Up
var express = require('express');
var app = express();
var path = require('path');

var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(express.static(path.resolve('app/public')));

app.use(cookieParser()); //read cookies (required for auth)
app.use(bodyParser.json()); //get information from html forms
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({ 
  secret: sessionSecret, // session secret
  saveUninitialized: true,
  resave: false
})); 

// Database Connection
var connectionString = "mongodb://" + databaseURI;
mongoose.connect(connectionString);

//Initialize the main Router
var router = express.Router();
require('./routes/router.js')(app, path, router);

// Server Initialization
var port = process.env.PORT || 9000;

app.listen(port);
