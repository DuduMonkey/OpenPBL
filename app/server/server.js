var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(express.static(path.resolve('app/public/')));

// GET: /
app.get('*', function(req, res) {
    res.sendFile(path.resolve('app/public/index.html'));
});

var port = process.env.PORT || 9000;

app.listen(port);
