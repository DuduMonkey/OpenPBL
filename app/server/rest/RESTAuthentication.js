var authenticationService = new (require('../Services/AuthenticationService'))();
var Q = require ('Q');

exports.post = function(req, res){

  var userEmail = req.body.email;
  var userPassword = req.body.password;

  authenticationService.authenticateUser(userEmail,userPassword)
    .then(function(authToken){

      res.status(200);

    })
    .catch(function(errorMessage){
      res.send({
        success : false,
        reason: errorMessage
      });
    });

}
