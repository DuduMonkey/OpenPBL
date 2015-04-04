var User = require('../models/User');
var Role = require('../models/constants/user_role');

// Constructor
function RegisterService() {

  //Private Methods
  this.validateNewUser = function (newMail, callback){
    var query = {email : newMail};

    //problema aqui
    User.find(query).exec(callback);
  };

}

// Class Methods
RegisterService.prototype.registerUser = function(userData, callback) {

  //New User entity
  var newUser = new User({
    name : userData.name,
    role : userData.role,
    local : {
      email : userData.email,
      password : userData.password
    }
  });
  
  //TODO callback para verificar se o userData.email já existe
  //será passado por parâmetro para a validateNewUser
  //dentro desse callback será executada a newUser.save caso o usuário seja valido
  validateAndSave = function(err,data){
    if(data){

    }else{
      newUser.save(callback);
    }
  }

  this.validateNewUser(userData.email, validateAndSave);

};

// export the class
module.exports = RegisterService;
