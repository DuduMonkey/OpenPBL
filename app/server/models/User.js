/*global module, require*/
(function () {
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
    var deferred = Q.defer()
    , isMatch = bcrypt.compareSync(candidatePassword, this.password);

    if (isMatch) {
      deferred.resolve();
    } else {
      deferred.reject(Exception.PASSWORD_NOT_MATCH);
    }

    return deferred.promise;
  };

  /** 
    Schema method to persist new user document on database 
  **/
  UserSchema.statics.saveNewUser = function (userData) {
    var deferred = Q.defer();

    var newUser = new this({
      name: userData.name,
      role: userData.role,
      email: userData.email,
      password: userData.password
    });

    newUser.save(function (err, data) {
      if (err) { 
        deferred.reject(Exception.USER_PERSISTENCE_ERROR); 
      }
      deferred.resolve(data);
    });

    return deferred.promise;
  };

  /** 
    Schema method to find user using email 
  **/
  UserSchema.statics.getUserByEmail = function (userEmail) {
    var deferred = Q.defer();

    var query = this.findOne({
      email: userEmail
    });

    query.exec(function (err, user) {
      if (err) { 
        deferred.reject(Exception.USER_FIND_ERROR); 
      }
      deferred.resolve(user);
    });

    return deferred.promise;
  };

  /**
    Method who finds all users using a passed selector and a list of criteria
  **/
  UserSchema.statics.findAllUsersIn = function (selectColumn, whereColumn, whereConditions) {
    var deferred = Q.defer()
    , query = this.find();

    query.where(whereColumn).in(whereConditions);

    if (selectColumn) { 
      query.select(selectColumn); 
    }

    query.exec(function (err, users) {
      if (err) { 
        deferred.reject(Exception.USER_LIST_FIND_ERROR); 
      }
      deferred.resolve(users);
    });

    return deferred.promise;
  };

  module.exports = mongoose.model('User', UserSchema);
}());
