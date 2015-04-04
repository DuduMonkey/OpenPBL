'use strict';

var bcrypt = require ('bcrypt-nodejs');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TokenSchema = new Schema({
  email: String,
  token: String,
  expirationTime: {type: Date, expires: '60', default: Date.now}
});

//password encrypt
TokenSchema.statics.generateHash = function() {
  
  var sessionSecret = process.env.SESSION_SECRET;
  var salt = bcrypt.genSaltSync(8);
  var hash = bcrypt.hashSync(sessionSecret,salt);

  return hash;
};

module.exports = mongoose.model('Token', TokenSchema);
