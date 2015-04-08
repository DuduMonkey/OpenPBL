'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  role: {type: Number, min: 1, max: 2},
  email: String,
  password: String
});

//password encrypt
UserSchema.methods.saveHashPassword = function(password) {

};

//password decrypt and compare
UserSchema.methods.validatePassword = function(password){
  return true;
};

module.exports = mongoose.model('User', UserSchema);
