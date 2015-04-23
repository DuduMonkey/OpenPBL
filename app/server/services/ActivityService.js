/*global require, module*/
(function () {
  'use strict';

  //Modules in use
  var Activity = require('../models/Activity');
  var Message = require('../shared/MessageResource');
  var userService = require('./UserService');
  var Q = require('q');


  /**
    Transforms the new activity data into an response bag 
    with activity id and
  **/
  var newActivityResponseBag = function (activityData) {
    var deferred = Q.defer();

    var responseBag = {};
    responseBag.id = activityData._id;
    responseBag.message = Message.SUCCESS_CREATING_ACTIVITY;

    deferred.resolve(responseBag);
    return deferred.promise;
  };

  /** 
    Mount and persists the new Activity, 
    link the activity with the creator
    get all users from participants (email list)
    send registration emails for non-registered users
    Make the promise chain to create the new activity
  **/
  var createNewActivity = function (token, activityData) {
    var deferred = Q.defer();

    var activity = {
      name: activityData.name,
      creatorId: '',
      participants: []
    };

    userService.getSessionUser(token)
      .then(function (sessionUser) {
        activity.creatorId = sessionUser._id;
        return userService.getUsersFromEmailList(activityData.participants);
      })
      .then(function (users) {
        return userService.getAttributeFromUserList('_id', users);
      })
      .then(function (usersIds) {
        activity.participants = usersIds;
        return Activity.saveNewActivity(activity);
      })
      .then(function (newActivity) {
        return newActivityResponseBag(newActivity);
      })
      .then(function (activityResponseBag) {
        deferred.resolve(activityResponseBag);
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
