/*global require, exports*/
(function () {
  'use strict';

  // Modules in use
  var authenticationService = require('../services/Authentication/AuthenticationService');

  /**
    Define the post action for user authentication
    Return HTTP status 200 and the session token on valid authentication
  */
  exports.post = function (req, res) {
    var userEmail = req.body.email;
    var userPassword = req.body.password;

    authenticationService.authenticateUser(userEmail, userPassword)
      .then(function (authenticationResponse) {
        res.status(200).send(authenticationResponse);
      })
      .catch(function (error) {
        res.status(400).send(error);
      });
  };
}());
