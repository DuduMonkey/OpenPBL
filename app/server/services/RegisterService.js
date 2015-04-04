var User = require('../models/User');
var Role = require('../models/constants/user_role');

// Constructor
RegisterService = function() {
}

// Class Methods
RegisterService.prototype.registerUser = function(userData, callback) {
  var newUser = new User({
    name : userData.name,
    role : userData.role,
    local : {
      email : userData.email,
      password : userData.password
    }
  });

  newUser.save(callback);
};

//Private Methods
var validadeUser = function(){

};

// export the class
module.exports = RegisterService;
