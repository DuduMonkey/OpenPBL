/*global module*/
(function () {
  'use strict';

  var declareNewError = function (errorMessage) {
    return { message: errorMessage };
  };

  module.exports = {
    // Token
    TOKEN_INVALID : declareNewError('Usuário não autenticado'),
    TOKEN_CREATION_ERROR: declareNewError('Erro na geração de uma nova Token'),
    TOKEN_HASHING_ERROR: declareNewError('Erro na geração do hash de Token'),
    TOKEN_FIND_ERROR: declareNewError('Erro na do documento da token'),
    // User
    USER_FIND_ERROR: declareNewError('Erro na busca de usuário'),
    USER_ALREADY_EXISTS: declareNewError('Email já cadastrado'),
    USER_PERSISTENCE_ERROR: declareNewError('Erro na persistencia dos dados de usuário'),
    USER_NOT_FIND: declareNewError('Email inválido'),
    USER_LIST_ERROR: declareNewError('Erro na busca da lista de usuários'),
    // Password
    PASSWORD_HASHING_ERROR: declareNewError('Erro na geração do hash'),
    PASSWORD_NOT_MATCH: declareNewError('A senha não confere'),
    // Activity
    ACTIVITY_CREATION_ERROR: declareNewError('Erro na persistencia da nova atividade'),
    ACTIVITY_LIST_ERROR: declareNewError('Erro na busca da lista de atividades'),
    ACTIVITY_INSERTING_STORY_ERROR: declareNewError('Erro ao salvar o problema'),
    ACTIVITY_UPDATING_ERROR: declareNewError('Erro ao atualizar a atividade'),
    ACTIVITY_DELETING_ERROR: declareNewError('Erro ao deletar a atividade'),
    ACTIVITY_INVALID_TO_DELETE: declareNewError('Atividade para exclusão inexistente'),
    ACTIVITY_USER_ALREADY_EXISTS: declareNewError('O usuário já foi convidado'),
    ACTIVITY_USER_NOT_EXISTS: declareNewError('Usuário não registrado'),
    ACTIVITY_USER_INSERTING_ERROR: declareNewError('Erro na inserção de usuário'),
    ACTIVITY_USER_REMOVE_ERROR: declareNewError('Erro ao remover usuário'),
    // JSON Helper
    PARSE_TO_JSON_EXCEPTION: declareNewError('Falha ao fazer o parse para JSON'),
    //Exception for not implemented functions
    FEATURE_NOT_IMPLEMENTED_EXCEPTION: declareNewError('Função não implementada no servidor'),
    //ROLE
    ROLE_VALUE_NOT_EXISTS: declareNewError('Não existe role com o valor consultado'),
    //RESPONSE BAG
    LOGIN_CANT_CREATE_TOKEN: declareNewError('Ocorreu um erro ao logar no sistema, contate o criador da aplicação'),
  };
}());


