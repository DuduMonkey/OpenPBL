/*global module, require*/
(function () {
  'use strict';

  // Modules in use
  var User = require('../models/User');
  var Q = require('q');
  var Exception = require('../shared/Exceptions');
  var Message = require('../shared/MessageResource');

  /**
    Validate if email from new user already exists on database
    'then' deferrer the promise as resolved if not
  */
  var isNewValidUser = function (mailAddress) {
    var deferred = Q.defer();

    User.getUserByEmail(mailAddress)
      .then(function (user) {
        if (!!user) {
          deferred.reject(Exception.USER_ALREADY_EXISTS);
        }
        deferred.resolve();
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  /** 
    Transforms the passed user data into a success response bag
  **/
  var newUserResponseBag = function (userData) {
    var deferred = Q.defer();

    var responseBag = {};
    responseBag.email = userData.email;
    responseBag.message = Message.SUCCESS_CREATING_USER;

    deferred.resolve(responseBag);
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
        return User.saveNewUser(userData);
      })
      .then(function (userData) {
        return newUserResponseBag(userData);
      })
      .then(function (responseBag) {
        deferred.resolve(responseBag);
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
