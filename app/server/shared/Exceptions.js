/*global module*/
(function () {
  'use strict';

  var declareNewError = function (errorMessage) {
    return { message: errorMessage };
  };

  module.exports = {
    // Token
    INVALID_TOKEN : declareNewError('Usuário não autenticado'),
    TOKEN_CREATION_ERROR: declareNewError('Erro na geração de uma nova Token'),
    TOKEN_HASHING_ERROR: declareNewError('Erro na geração do hash de Token'),
    TOKEN_FIND_ERROR: declareNewError('Erro na do documento da token'),
    // User
    USER_FIND_ERROR: declareNewError('Erro na busca de usuário'),
    USER_ALREADY_EXISTS: declareNewError('Email já cadastrado'),
    USER_PERSISTENCE_ERROR: declareNewError('Erro na persistencia dos dados de usuário'),
    USER_NOT_FIND: declareNewError('Email inválido'),
    USER_LIST_FIND_ERROR: declareNewError('Erro na busca da lista de usuários'),
    // Password
    PASSWORD_HASHING_ERROR: declareNewError('Erro no hash de senha'),
    PASSWORD_NOT_MATCH: declareNewError('A senha não confere'),
    // Activity
    ERROR_CREATING_NEW_ACTIVITY: declareNewError('Erro na persistencia da nova atividade'),
    ACTIVITY_LIST_FIND_ERROR: declareNewError('Erro na busca da lista de atividades'),
    ERROR_INSERTING_STORY: declareNewError('Erro ao salvar o problema'),
    ERROR_UPDATING_ACTIVITY: declareNewError('Erro ao atualizar a atividade'),
    ERROR_DELETE_ACTIVITY: declareNewError('Erro ao deletar a atividade'),
    INVALID_ACTIVITY_TO_DELETION: declareNewError('Atividade para exclusão inexistente'),
    ERROR_ACTIVITY_USER_INSERT: declareNewError('O usuário já foi convidado'),
    ERROR_ACTIVITY_USER_DELETE: declareNewError('Erro ao remover usuário'),
    USER_INSERTING_ERROR: declareNewError('Erro ao inserir novo usuário'),
    // JSON Helper
    PARSE_TO_JSON_EXCEPTION: declareNewError('Falha ao fazer o parse para JSON'),
    //Exception for not implemented functions
    NOT_IMPLEMENTED: declareNewError('Função não implementada no servidor'),
    //ROLE
    ROLE_VALUE_NOT_ASSIGNED: declareNewError('Não existe role com o valor consultado'),
    //RESPONSE BAG
    ERROR_ON_LOGIN_RESPONSE_GENERATION: declareNewError('Erro na geração da responsta de login'),
  };
}());


