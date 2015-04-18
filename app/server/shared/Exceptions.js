/*global module*/
(function () {
  'use strict';

  var declareNewError = function (errorMessage) {
    return { message: errorMessage };
  };

  module.exports = {
    INVALID_TOKEN : declareNewError('Usuário não autenticado'),
    TOKEN_CREATION_ERROR: declareNewError('Erro na geração de uma nova Token'),
    TOKEN_HASHING_ERROR: declareNewError('Erro na geração do hash de Token'),
    USER_FIND_ERROR: declareNewError('Erro na busca de usuário'),
    USER_ALREADY_EXISTS: declareNewError('Email já cadastrado'),
    USER_PERSISTENCE_ERROR: declareNewError('Erro na persistencia dos dados de usuário'),
    USER_NOT_FIND: declareNewError('Usuário não encontrado'),
    PASSWORD_HASHING_ERROR: declareNewError('Erro no hash de senha'),
    PASSWORD_NOT_MATCH: declareNewError('A senha não confere')
  };
}());


