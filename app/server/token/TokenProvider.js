var Token = require('./Token');
var Q = require ('Q');

// Constructor
function TokenProvider() {



};

// Class Methods
TokenProvider.prototype.createToken = function(email) {

  var deferred = Q.defer();

  var tokenHash = Token.generateHash();


  var newToken = new Token({
    email : email,
    token : tokenHash
  });
  
  newToken.save(function(error, token){

    if(error){

      var errorMessage = {message: 'Erro na criação ao gerar token de sessão'}
      deferred.reject(errorMessage);

    }else{

      deferred.resolve(token);

    };

  });

  return deferred.promise;
  
};



// export the class
module.exports = TokenProvider;
