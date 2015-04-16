/*global module, require*/
(function () {
  'use strict';
  // Modules in use
  var Token = require('./Token');
  var Q = require('q');
  var Exception = require('../shared/Exceptions');

  /**
    Create a token using the user email payload

    Return the promise as resolved if token was generated (save)
  */
  var createToken = function (userMail) {
    var deferred = Q.defer();

    var newToken = new Token({
      email: userMail,
      token: userMail,
    });

    newToken.save(function (error, data) {
      if (error) {
        deferred.reject(Exception.TOKEN_CREATION_ERROR);
      }
      deferred.resolve(data.token);
    });

    return deferred.promise;
  };

  // Export the module as singleton the token provider Type
  module.exports = {
    createToken : createToken
  };
}());
