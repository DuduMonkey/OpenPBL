/*global module, require*/
(function () {
  'use strict';

  // Modules in use
  var User = require('../models/User');
  var Q = require('q');
  var Exception = require('../shared/Exceptions');

  /**
    Validate if email from new user already exists on database
    'then' deferrer the promise as resolved if not
  */
  var isNewValidUser = function (mailAddress) {
      var deferred = Q.defer();

      var query = {email : mailAddress};

      User.find(query).exec(function (error, users) {
        if (error) {
          deferred.reject(Exception.USER_FIND_ERROR);
        } else if (users.length > 0) {
          deferred.reject(Exception.USER_ALREADY_EXISTS);
        } else {
          deferred.resolve();
        }
      });

      return deferred.promise;
    };

  /**
    Register the new user.
      Uses mongoose structure to save the new user instance,
      then resolve the user data as resolved.
  */
  var registerUser = function (userData) {
    var deferred = Q.defer();

    var newMail = userData.email;

    isNewValidUser(newMail)
      .then(function () {
        var newUser = new User({
          name : userData.name,
          role : userData.role,
          email : userData.email,
          password : userData.password
        });

        newUser.save(function (error, data) {
          if (error) {
            deferred.reject(Exception.USER_PERSISTENCE_ERROR);
          } else {
            deferred.resolve(data);
          }
        });
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };



  // Export the module as the singleton RegisterUser type
  module.exports = {
    registerUser: registerUser
  };
}());
