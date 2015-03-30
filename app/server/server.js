'use strict';

// Environment & Configuration Variables
var environment = process.env.NODE_ENV;
var databaseURI = process.env.CONN_STRING;
var sessionSecret = process.env.SESSION_SECRET;

// Set Up
var express = require('express');
var app = express();
var path = require('path');

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(express.static(path.resolve('app/public')));

app.use(morgan('dev')); //log requests to console
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
app.use(flash());


// Database Connection
var connectionString = "mongodb://" + databaseURI;
mongoose.connect(connectionString);

// Route Configuration
var router = express.Router();

// Middleware for routes
router.use(function(req, res, next) {
    console.log(req.body);
    next();
})

// Default test route
router.get('/', function(req, res) {
    res.json({
        success: true
    });
});

app.use('/api', router); //Prefix every route with /api


// Server Initialization
app.get('*', function(req, res) {
  res.sendFile(path.resolve('app/public/index.html'));
});

var port = process.env.PORT || 9000;

app.listen(port);
