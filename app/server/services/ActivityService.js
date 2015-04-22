/*global require, module*/
(function () {
  'use strict';

  //Modules in use
  var Activity = require('../models/Activity');
  var Exception = require('../shared/Exceptions');
  var userService = require('./UserService');
  var Q = require('q');


  var saveNewActivity = function (activityData, activityCreator) {
    var deferred = Q.defer();

    var newActivity = new Activity({
      name: activityData.name,
      _creator: activityCreator._id
    });

    newActivity.save(function (error, activity) {
      if(error){
        deferred.reject(Exception.ERROR_CREATING_NEW_ACTIVITY);
      }
      deferred.resolve(activity);
    });

    return deferred.promise;
  };

  var createNewActivity = function (token, activityData) {
    var deferred = Q.defer();
    
    userService.getSessionUser(token)
      .then(function (sessionUser) {
        return saveNewActivity(activityData, sessionUser);
      })
      .then(function (newActivity) {
        deferred.resolve(newActivity);
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
