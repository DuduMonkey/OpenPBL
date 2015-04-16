/*global require, module*/
'use strict';

// Modules in use
var User = require('../models/User');
var TokenProvider = require('../token/TokenProvider');
var Q = require('q');

/**
  Validate user credentials
    Find for one user with that credentials,
    then if finds the user, resvolve de promise
    else, reject the promisse with error status message
*/
var verifyUserCredentials = function (userMail, candidatePassword) {
  var errorMessage;
  var deferred = Q.defer();

  var query = {email: userMail};

  User.findOne(query).exec(function (error, user) {
    if (error) {
      errorMessage = 'Erro na busca de usuário';
      deferred.reject(errorMessage);
    } else if (!user) {
      errorMessage = 'Usuário inexistente';
      deferred.reject(errorMessage);
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
