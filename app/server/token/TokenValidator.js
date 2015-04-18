/*global require, module*/
(function () {
  'use strict';

  // Modules in use
  var Token = require('./Token');
  var Q = require('q');
  var Exception = require('../shared/Exceptions');

  /**
    Validate a token candidate with collection from database

    If the token are valid ('find' encounter more than zero)

    return the promise as resolved
  */
  var validateCandidate = function (tokenCandidate) {
    var deferred = Q.defer();

    var query = {token : tokenCandidate};

    /*jslint unparam: true*/
    Token.find(query).exec(function (err, tokens) {
      if (tokens.length > 0) {
        deferred.resolve();
      }
      deferred.reject(Exception.INVALID_TOKEN);
    });
    /*jslint unparam: false*/
    return deferred.promise;
  };

  // Export the module as singleton the token validation Type
  module.exports = {
    validateToken: validateCandidate
  };
}());
