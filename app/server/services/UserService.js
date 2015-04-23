/*global require, module*/
(function () {
  'use strict';

  //Modules in use
  var User = require('../models/User');
  var Token = require('../token/Token');
  var Q = require('q');

  /**
    Find an User using the session token.
  */
  var getSessionUser = function (userToken) {
    var deferred = Q.defer();

    var userEmail;

    Token.getUserEmail(userToken)
      .then(function (tokenEmail) {
        userEmail = tokenEmail;
        return User.getUserByEmail(userEmail);
      })
      .then(function (user) {
        deferred.resolve(user);
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  /**
    Find all users in passed emailList
  **/
  var getUsersFromEmailList = function (emailListJSON) {
    var deferred = Q.defer();

    var listOfEmailCriteria = [];
    var emailSelector = 'email';

    emailListJSON.forEach(function (emailObject) {
      listOfEmailCriteria.push(emailObject.email);
    });

    User.findAllUsersIn(null, emailSelector, listOfEmailCriteria)
      .then(function (users) {
        deferred.resolve(users);
      })
      .catch(function (err) {
        deferred.reject(err);
      });

    return deferred.promise;
  };

  // export the class
  module.exports = {
    getSessionUser: getSessionUser,
    getUsersFromEmailList: getUsersFromEmailList,
  };
}());
