// Environment & Configuration Variables
var environment = process.env.NODE_ENV;
var databaseURI = process.env.CONN_STRING;

// Set Up
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.use(express.static(path.resolve('app/public/')));

// Database Connection
var connectionString = "mongodb://" + databaseURI;
mongoose.connect(connectionString);



// Server Initialization
app.get('*', function(req, res) {
    res.sendFile(path.resolve('app/public/index.html'));
});

var port = process.env.PORT || 9000;

app.listen(port, function() {
    console.log("App listening as %s on port %d", app.settings.env, this.address().port);
    console.log("Connected to database on: " + connectionString);
});
