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
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.gentSaltSync(8), null);
};

//password decrypt and compare
UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
