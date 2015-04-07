'use strict';

var bcrypt = require ('bcrypt-nodejs');

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
  var hash = bcrypt.hashSync(password);
  this.password = hash;
};

//password decrypt and compare
UserSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
