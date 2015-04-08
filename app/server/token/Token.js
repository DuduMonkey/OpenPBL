'use strict';

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

  return 'TokenMock';
};

module.exports = mongoose.model('Token', TokenSchema);
