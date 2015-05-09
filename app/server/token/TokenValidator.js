/*global require, module*/
(function () {
  'use strict';

  // Modules in use
  var Token = require('./Token');
  var Q = require('q');

  /**
    Validate a token candidate with collection from database

    If the token are valid ('find' encounter more than zero)

    return the promise as resolved
  */
  var validateCandidate = function (tokenCandidate) {
    var deferred = Q.defer();

    Token.getUserEmail(tokenCandidate)
      .then(function (userMail) {
        if (!!userMail) {
          deferred.resolve();
        }
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  // Export the module as singleton the token validation Type
  module.exports = {
    validateToken: validateCandidate
  };
}());
