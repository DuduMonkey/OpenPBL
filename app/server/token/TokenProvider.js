/*global module, require*/
(function () {
  'use strict';
  // Modules in use
  var Token = require('./Token');
  var Q = require('q');

  /**
    Create a token using the user email payload

    Return the promise as resolved if token was generated (save)
  */
  var createToken = function (userMail) {
    var deferred = Q.defer();

    Token.saveNewToken(userMail)
      .then(function (dataToken) {
        deferred.resolve(dataToken.token);
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  // Export the module as singleton the token provider Type
  module.exports = {
    createToken : createToken
  };
}());
