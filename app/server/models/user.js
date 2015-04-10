'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-then');

var Q = require ('Q');

var UserSchema = new Schema({
  name: { type: String, required: true},
  role: { type: Number, min: 1, max: 2, required: true},
  email: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true }
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
UserSchema.methods.validatePassword = function(candidatePassword){

  var deferred = Q.defer();

  bcrypt.compare(candidatePassword, this.password)
    .then(function(isValid){
      deferred.resolve(isValid);
    })
    .catch(function(error){
      deferred.reject(error);
    });

  return deferred.promise;
};

module.exports = mongoose.model('User', UserSchema);
