/*global require, exports*/
(function () {
  'use strict';

  // Modules in use
  var registerService = require('../services/RegisterService'); //Initialize and run

  /**
    Define the post action for user registration
    Return the new user email and the success status on successful register.
  */
  exports.post = function (req, res) {
    registerService.registerUser(req.body)
      .then(function (responseBag) {
        res.send(responseBag);
      })
      .catch(function (error) {
        res.send(error);
      });
  };
}());
