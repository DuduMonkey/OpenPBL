(function (){
  'use strict';

  var declareNewMessage = function (message) {
    return { message: message };
  };

  module.exports = {
    //Activity
    SUCCESS_CREATING_ACTIVITY : declareNewMessage('Atividade criada com sucesso'),
  };
}());
