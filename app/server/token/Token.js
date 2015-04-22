/*global module, require, process*/
(function () {
  'use strict';

  // Modules in use
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var jwt = require('jwt-simple');
  var Exception = require('../shared/Exceptions');
  var Q = require('q');

  // Create a Token Scheme (Entity)
  // email          -> unique                   =>  asserts 1:1 token for users
  // token          -> hashing                  =>  asserts securty for tokens
  // expirationTime -> Date.now + 3600 seconds  =>  asserts auto-delete from database
  var TokenSchema = new Schema({
    email: String,
    token: String,
    expirationTime: {type: Date, expires: 3600, default: Date.now}
  });

  /** 
    Middleware for 'save' operation on this model
    
    Uses the environment variable SECRET or generate one random string if SECRET=undefined
    "In case os missused export SECRET=yaddayadda"
    
    Generate the hash using JSON Web Token (jwt)

    return the token if that are save
  */
  TokenSchema.pre('save', function (next) {
    var tokenEntity = this;

    if (!tokenEntity.isModified('token')) {
      return next();
    }

    var sessionSecret = process.env.SECRET;

    var tokenHash = jwt.encode({ email: tokenEntity.email }, sessionSecret);

    if (tokenHash) {
      tokenEntity.token = tokenHash;
      next();
    }

    return Exception.TOKEN_HASHING_ERROR;
  });

  /** Schema method to find user email by user token  */
  TokenSchema.statics.getUserEmail = function (userToken) {
    var deferred = Q.defer();

    var query = this.findOne({ token: userToken }, { _id: 0 });

    query.select('email');

    query.exec(function (err, data) {
      if (err) {
        deferred.reject(Exception.TOKEN_FIND_ERROR);
      }else if(!!data){
        deferred.resolve(data.email);
      }
      deferred.reject(Exception.INVALID_TOKEN);
    });

    return deferred.promise;
  };

  /** Persist new token entity on database  **/
  TokenSchema.statics.saveNewToken = function (userMail) {
    var deferred = Q.defer();

    var newToken = new this({
      email: userMail,
      token: userMail,
    });

    newToken.save(function (error, token) {
      if (error) {
        deferred.reject(Exception.TOKEN_CREATION_ERROR);
      }
      deferred.resolve(token);
    });

    return deferred.promise;
  };

  //Export the module as Token
  module.exports = mongoose.model('Token', TokenSchema);
}());
