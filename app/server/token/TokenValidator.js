var Token = require('./Token');
var Q = require ('Q');

// Constructor
function TokenProvider() {



};

// Class Methods
TokenProvider.prototype.validateToken = function(tokenCandidate) {

  var deferred = Q.defer();

  var query = {token : tokenCandidate};

  Token.find(query).exec(function(err, tokens){
    if(tokens.length > 0){
      deferred.resolve();
    }else{
      deferred.reject();
    }
  });

  return deferred.promise;
  
};

// export the class
module.exports = TokenProvider;
