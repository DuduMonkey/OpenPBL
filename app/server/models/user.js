'use strict';

var bcrypt = require ('bcrypt-nodejs');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  role: {type: Number, min: 1, max: 1},
  local: {
    email: String,
    password: String
  }
});

//password encrypt
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.gentSaltSync(8), null);
};

//password decrypt
UserSchema.methods.validPassword = function(password){
  return bcrypt.comparSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
