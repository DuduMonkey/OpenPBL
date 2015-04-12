/*global require, module*/
'use strict';

// Modules in use
var Token = require('./Token');
var Q = require ('Q');

// Constructor
function TokenProvider() {
}

/**
  Validate a token candidate with collection from database

  If the token are valid ('find' encounter more than zero)

  return the promise as resolved
*/
TokenProvider.prototype.validateToken = function(tokenCandidate) {
  var deferred = Q.defer();

  var query = {token : tokenCandidate};

  Token.find(query).exec(function(err, tokens){
    
    if (tokens.length > 0) {
      deferred.resolve();
    }
    
    deferred.reject();
  });

  return deferred.promise;
};

// Export the module as TokenProvider
module.exports = TokenProvider;
