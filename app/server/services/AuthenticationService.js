/*global require, module*/
(function () {
  'use strict';

  // Modules in use
  var User = require('../models/User');
  var Exception = require('../shared/Exceptions');
  var tokenProvider = require('../token/TokenProvider');
  var userService = require('./UserService');
  var Q = require('q');

  /**
    Validate user credentials
      Find for one user with that credentials,
      then if finds the user, resvolve de promise
      else, reject the promisse with error status message
  */
  var verifyUserCredentials = function (userMail, candidatePassword) {
    var deferred = Q.defer();

    User.getUserByEmail(userMail)
      .then(function (user) {
        if (!!user) {
          return user.validatePassword(candidatePassword);
        }
        deferred.reject(Exception.USER_NOT_FIND);
      })
      .then(function () {
        deferred.resolve();
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  /**
    Authenticate the user using Token Provider
    If the User Credentials are valid then resolve de promise 
    and sendthe created session token
  */
  var authenticateUser = function (userMail, userPassword) {
    var deferred = Q.defer();

    verifyUserCredentials(userMail, userPassword)
      .then(function () {
        return tokenProvider.createToken(userMail);
      })
      .then(function (token) {
        return userService.getSessionUserResponseBag(token);
      })
      .then(function (sessionUserResponseBag) {
        deferred.resolve(sessionUserResponseBag);
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  // export the class
  module.exports = {
    authenticateUser: authenticateUser
  };
}());
