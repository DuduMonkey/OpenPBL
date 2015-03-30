'use strict';

// Environment & Configuration Variables
var environment = process.env.NODE_ENV;
var databaseURI = process.env.CONN_STRING;
var sessionSecret = process.env.SESSION_SECRET;

// Set Up
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

var mongoose = require('mongoose');
var passport = require('passport');

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

app.use(passport.initialize());
app.use(passport.session());


// Database Connection
var connectionString = "mongodb://" + databaseURI;
mongoose.connect(connectionString);

//LOGGER
var morgan = require('morgan');
var logger = morgan('combined');

http.createServer(function(req,res){
  var done = finalhandler(req,res);
  logger(req, res, function(err){
    if(err) return done(err);

    res.setHeader('content-type', 'text/plain');
    res.end('LOG')
  });
});

//Initialize the main Router
var router = express.Router();
require('./route/router.js')(app, passport, path, router);

// Server Initialization
var port = process.env.PORT || 9000;

app.listen(port);
