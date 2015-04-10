var User = require('../models/User');
var TokenProvider = new (require('../token/TokenProvider'))();
var Q = require ('Q');


AuthenticationService.prototype.authenticateUser = function(userMail, userPassword){

  var deferred = Q.defer();

  this.verifyUserCredentials(userMail, userPassword)
  .then(function(){
    
    deferred.resolve('token mockada');

  })
  .catch(function(error){
    deferred.reject(error);

  });

  return deferred.promise;
};


function AuthenticationService() {

  this.verifyUserCredentials = function(userMail, candidatePassword){
    var deferred = Q.defer();

    var query = {email : userMail};

    User.findOne(query).exec(function(error, user){
      if(error){

        var errorMessage = 'Erro na busca de usuário';
        deferred.reject(errorMessage);

      }else if(!user){

        var errorMessage = 'Usuário inexistente';
        deferred.reject(errorMessage);

      }else{
        //Valida a senha
        user.validatePassword(candidatePassword)
        .then(function(isValid){
          if(isValid){

            deferred.resolve();

          }else{

            errorMessage = 'Senha inválida';
            deferred.reject(errorMessage);

          }
        })
        .catch(function(error){

          errorMessage = 'Erro na validação de senha';
          deferred.reject(errorMessage);
          
        });
      };
    });

    return deferred.promise;
  };
}

// export the class
module.exports = AuthenticationService;
