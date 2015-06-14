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
    ACTIVITY_QUERY_ERROR: declareNewError('Erro ao buscar dados de atividades na base de dados'),
    ACTIVITY_UPDATING_ERROR: declareNewError('Erro ao atualizar a atividade'),
    ACTIVITY_DELETING_ERROR: declareNewError('Erro ao deletar a atividade'),
    ACTIVITY_INVALID_TO_DELETE: declareNewError('Atividade para exclusão inexistente'),
    ACTIVITY_GET_BASIC_DATA_ERROR: declareNewError('Não foram encontrados os dados básicos da atividade'),
    ACTIVITY_FIND_ACTIVITY_ERROR: declareNewError('Erro ao executar a busca da atividade na base de dados'),
    // Status
    ACTIVITY_STATUS_UPDATING_ERROR: declareNewError('Erro ao atualizar o status da atividade'),
    ACTIVITY_STATUS_IS_FINISHED: declareNewError('A atividade já foi encerrada'),
    // Activity User
    ACTIVITY_USER_ALREADY_EXISTS: declareNewError('O usuário já foi convidado'),
    ACTIVITY_USER_NOT_EXISTS: declareNewError('Usuário não registrado'),
    ACTIVITY_USER_INSERTING_ERROR: declareNewError('Erro na inserção de usuário'),
    ACTIVITY_USER_REMOVE_NOT_FIND: declareNewError('O usuário já foi removido da atividade'),
    ACTIVITY_USER_REMOVE_ERROR: declareNewError('Erro ao remover usuário'),
    // Activity Story
    ACTIVITY_STORY_INSERTING_ERROR: declareNewError('Erro ao salvar o problema da atividade'),
    ACTIVITY_STORY_UPDATE_ERROR: declareNewError('Erro ao atualizar o problema da atividade'),
    // Posts
    ACTIVITY_POST_SERVICE_ERROR: declareNewError('Erro na geração do serviço de posts'),
    ACTIVITY_POST_INSERT_ERROR: declareNewError('Erro na persistencia do post'),
    ACTIVITY_POST_CREATING_ERROR: declareNewError('Erro na definição da postagem no serviço'),
    ACTIVITY_POST_DELETE_ERROR: declareNewError('Erro ao deletar o post'),
    ACTIVITY_POST_INVALID_TO_DELETE: declareNewError('Post para exclusão não encontrado'),
    ACTIVITY_POST_QUERY_ERROR: declareNewError('Erro ao buscar da postagem na base de dados'),
    // Research
    ACTIVITY_RESEARCH_ERROR: declareNewError('Erro ao inserir os dados de pesquisa na atividade'),
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


