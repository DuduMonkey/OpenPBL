/*global module*/
(function () {
  'use strict';

  var declareNewError = function (errorMessage) {
    return { message: errorMessage };
  };

  module.exports = {
    //Token Errors
    INVALID_TOKEN : declareNewError('Usuário não autenticado'),
    TOKEN_CREATION_ERROR: declareNewError('Erro na geração de uma nova Token'),
    TOKEN_HASHING_ERROR: declareNewError('Erro na geração do hash de Token'),
    TOKEN_FIND_ERROR: declareNewError('Erro na do documento da token'),
    //User Errors
    USER_FIND_ERROR: declareNewError('Erro na busca de usuário'),
    USER_ALREADY_EXISTS: declareNewError('Email já cadastrado'),
    USER_PERSISTENCE_ERROR: declareNewError('Erro na persistencia dos dados de usuário'),
    USER_NOT_FIND: declareNewError('Usuário não encontrado'),
    //PASSWORD ERROR
    PASSWORD_HASHING_ERROR: declareNewError('Erro no hash de senha'),
    PASSWORD_NOT_MATCH: declareNewError('A senha não confere'),
    //ROLE
    ROLE_VALUE_NOT_ASSIGNED: declareNewError('Não existe role com o valor consultado'),
    //RESPONSE BAG
    ERROR_ON_LOGIN_RESPONSE_GENERATION: declareNewError('Erro na geração da responsta de login'),
  };
}());


