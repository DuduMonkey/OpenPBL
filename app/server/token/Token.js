'use strict';

//http://www.kdelemme.com/2014/03/09/authentication-with-angularjs-and-a-node-js-rest-api/
//https://www.npmjs.com/package/json-web-token

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-then');
var jwt = require('jwt-simple');

var TokenSchema = new Schema({
  email: String,
  token: String,
  expirationTime: {type: Date, expires: '10', default: Date.now}
});

//password encrypt
TokenSchema.statics.generateHash = function(userMail) {

  var sessionSecret = process.env.SECRET;

  var token = jwt.encode({ email: userMail }, sessionSecret);

  return token;
};

module.exports = mongoose.model('Token', TokenSchema);
