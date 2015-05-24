(function () {
  'use strict';

  var declareNewMessage = function (message) {
    return message;
  };

  module.exports = {
    // Activity
    SUCCESS_CREATING_ACTIVITY: declareNewMessage('Atividade criada com sucesso'),
    // User
    SUCCESS_CREATING_USER: declareNewMessage('Usuário cadastrado com sucesso'),
    SUCCESS_INSERTING_USER: declareNewMessage('Usuário inserido com sucesso'),
    SUCCESS_REMOVING_USER: declareNewMessage('Usuário removido com sucesso'),
    // Story
    SUCCESS_SAVING_STORY: declareNewMessage('Problema salvo com sucesso'),
  };
}());
