var User = require('../models/User');
var Role = require('../models/constants/user_role');
var Q = require ('Q');

// Constructor
function RegisterService() {

  //Private Methods
  this.isNewValidUser = function (mailAddress){
    
    var deferred = Q.defer();

    var query = {email : mailAddress};

    User.find(query).exec(function(error,users){
      if(error){

        var errorMessage = 'Erro na busca de usuário';
        deferred.reject(errorMessage);

      }else if(users.length > 0){

        var errorMessage = 'Email já cadastrado';
        deferred.reject(errorMessage);

      }else{

        deferred.resolve();
      };
    });

    return deferred.promise;
  };

};

// Class Methods
RegisterService.prototype.registerUser = function(userData, callback) {

  var deferred = Q.defer();

  var newMail = userData.email;

  this.isNewValidUser(newMail)
    .then(function () {

      var newUser = new User({
        name : userData.name,
        role : userData.role,
        email : userData.email
      });

      newUser.saveHashPassword(userData.password);

      newUser.save(function(error,data){

        if (error) {

          var errorMessage = 'Erro na persistencia dos dados';
          deferred.reject(errorMessage);

        } else {

          deferred.resolve(data);    

        };
      });
    })
    .catch(function (error) {

      deferred.reject(error);

    });

  return deferred.promise;

};



// export the class
module.exports = RegisterService;
