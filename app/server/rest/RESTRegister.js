var registerService = require('../services/RegisterService'); //Initialize and run
var Q = require ('q');

exports.post = function(req,res){

  registerService.registerUser(req.body)
    .then(function(newUser){
      res.send({
        email : newUser.email,
        success: true
      });
    })
    .catch(function(errorMessage){
      res.send({
        success: false,
        reason : errorMessage
      });
    });

}
