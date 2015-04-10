'use strict';

//http://www.kdelemme.com/2014/03/09/authentication-with-angularjs-and-a-node-js-rest-api/
//https://www.npmjs.com/package/json-web-token

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-then');

var TokenSchema = new Schema({
  email: String,
  token: String,
  expirationTime: {type: Date, expires: '60', default: Date.now}
});

//password encrypt
TokenSchema.statics.generateHash = function() {
  
  var sessionSecret = process.env.SESSION_SECRET;
  bcrypt.hash(sessionSecret)
    .then(function(token){
      return token;
    })
    .catch(function(){
      return 'nada';
    });
};

module.exports = mongoose.model('Token', TokenSchema);
