var User = require('../models/User');
var Token = require('../token/TokenProvider');
var Q = require ('Q');


AuthenticationService.prototype.authenticateUser = function(userMail, userPassword){

  var deferred = Q.defer();

  this.verifyUserCredentials(userMail, userPassword)
  .then(function(){

    Token.createToken(email)
      .then(function(validToken){
        deferred.resolve(validToken);

      })
      .catch(function(error){
        deferred.reject(error);
      });

  })
  .catch(function(error){
    deferred.reject(error);

  });

  return deferred.promise;
};


function AuthenticationService() {

  this.verifyUserCredentials = function(userMail, userPassword){
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
        var passwordIsValid = user.validatePassword(userPassword);
      }         

      if(passwordIsValid){
        deferred.resolve();

      }else{
        var errorMessage = 'Senha inválida';
        deferred.reject(errorMessage);

      }
    });

    return deferred.promise;
  };
}

// export the class
module.exports = AuthenticationService;
