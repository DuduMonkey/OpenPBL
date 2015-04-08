var authenticationService = new (require('../Services/AuthenticationService'))();
var Q = require ('Q');

exports.post = function(req, res){

  var userEmail = req.body.email;
  var userPassword = req.body.password;

  authenticationService.authenticateUser(userEmail,userPassword)
    .then(function(authToken){
      var headerName = 'auth-pbl-code';

      var loggedMessage = 'autenticado com sucesso';

      res
        .status(200)
        .setHeader(headerName, authToken)
        .send({successMessage: loggedMessage});

    })
    .catch(function(errorMessage){
      res.send({
        success : false,
        reason: errorMessage
      });
    });

}
