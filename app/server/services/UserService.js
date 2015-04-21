/*global require, module*/
(function () {
  'use strict';

  //Modules in use
  var User = require('../models/User');
  var Token = require('../token/Token');
  var Q = require('q');

  /**
    Find an User using the session token.
  */
  var getSessionUser = function (userToken) {
    var deferred = Q.defer();

    var userEmail;

    Token.getUserEmail(userToken)
      .then(function (tokenEmail) {
        userEmail = tokenEmail;
        return User.getUserByEmail(userEmail);
      })
      .then(function (user) {
        deferred.resolve(user);
      })
      .catch(function (error) {
        deferred.reject(error);
      });
      
    return deferred.promise;
  };

  // export the class
  module.exports = {
    getSessionUser: getSessionUser
  };
}());
