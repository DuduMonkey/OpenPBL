/*global module, require*/
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

  var newToken = new Token({
    email: userMail,
    token: userMail,
  });

  newToken.save(function (error, data) {
    if (error) {
      var errorMessage = { message: 'Erro na criação ao gerar token de sessão' };
      deferred.reject(errorMessage);
    }
    deferred.resolve(data.token);
  });

  return deferred.promise;
};

// Export the module as singleton the token provider Type
module.exports = {
  createToken : createToken
};
