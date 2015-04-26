/*global require, module*/
(function () {
  'use strict';

  //Modules in use
  var Activity = require('../models/Activity');
  var Exception = require('../shared/Exceptions');
  var userService = require('./UserService');
  var Q = require('q');



  var createNewActivity = function (token, activityData) {
    var deferred = Q.defer();

    userService.getSessionUser(token)
      .then(function (user) {
        deferred.resolve(user);
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  // export the class
  module.exports = {
    createNewActivity: createNewActivity
  };
}());
