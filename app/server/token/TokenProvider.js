var Token = require('./Token');
var Q = require ('Q');

// Constructor
function TokenProvider() {



};

// Class Methods
TokenProvider.prototype.createToken = function(userMail) {

  var deferred = Q.defer();

  var newToken = new Token({
    email : userMail,
    token : 'defaultToken'
  });
  
  newToken.save(function(error, data){

    if(error){

      var errorMessage = {message: 'Erro na criação ao gerar token de sessão'}
      deferred.reject(errorMessage);

    }else{

      deferred.resolve(data.token);
      
    };

  });

  return deferred.promise;
  
};



// export the class
module.exports = TokenProvider;
