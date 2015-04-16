/*global module, require*/
'use strict';

// Modules in use
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var Exception = require('../shared/Exceptions');

/**
  Defines the mongo user schema
    Name: String required
    Role: Number, accepts only 1 and 2
    Email: String required and unique,
    Password: String required
*/
var UserSchema = new Schema({
  name: { type: String, required: true },
  role: { type: Number, min: 1, max: 2, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

/**
  Middlaware for hashing password before save on database,
  capture the "save" action and exchange the string password
  for the hashed password.
*/
UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  var hash = bcrypt.hashSync(user.password);

  if (hash) {
    user.password = hash;
    next();
  } else {
    return Exception.PASSWORD_HASHING_ERROR;
  }
});

/**
  Decrypt the hashed password from "this" user instance (find on database)
  and compare with the candidate password, on valid. resolve the promise
*/
UserSchema.methods.validatePassword = function (candidatePassword) {
  var deferred = Q.defer();

  var isMatch = bcrypt.compareSync(candidatePassword, this.password);

  if (isMatch) {
    deferred.resolve();
  } else {
    deferred.reject(Exception.PASSWORD_NOT_MATCH);
  }

  return deferred.promise;
};

module.exports = mongoose.model('User', UserSchema);
