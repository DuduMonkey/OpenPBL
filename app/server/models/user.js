'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-then');


var UserSchema = new Schema({
  name: String,
  role: {type: Number, min: 1, max: 2},
  email: String,
  password: String
});

//Middlaware for hashing password before save on database
UserSchema.pre('save', function(next){
  var user = this;

  if(!user.isModified('password')) return next();

  bcrypt.hash(user.password, 8)
    .then(function(hash){
      user.password = hash;
      next();
    })
    .catch(function(error){
      return err;
    });
});

//password decrypt and compare
UserSchema.methods.validatePassword = function(password){
  return true;
};

module.exports = mongoose.model('User', UserSchema);
