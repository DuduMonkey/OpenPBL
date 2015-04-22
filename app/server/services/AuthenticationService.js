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

    var query = {email: userMail};

    User.findOne(query).exec(function (error, user) {
      if (error) {
        deferred.reject(Exception.USER_FIND_ERROR);
      } else if (!user) {
        deferred.reject(Exception.USER_NOT_FIND);
      } else {
        user.validatePassword(candidatePassword)
          .then(function () {
            deferred.resolve();
          })
          .catch(function (error) {
            deferred.reject(error);
          });
      }
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
        TokenProvider.createToken(userMail)
          .then(function (token) {
            deferred.resolve(token);
          })
          .catch(function (error) {
            deferred.reject(error);
          });
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
