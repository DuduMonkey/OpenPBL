(function () {
  'use strict';

  var Activity = require('../../../models/Activity');
  var Message = require('../../../shared/MessageResource');
  var Exception = require('../../../shared/Exceptions');
  var Q = require('q');

  var saveActivityAbstraction = function (activityId, abstractionViewData) {
    var deferred = Q.defer();

    var queryUpdateAbstraction = {
      $set: {
        abstraction: abstractionViewData.abstraction
      }
    };

    Activity.updateActivity(activityId, queryUpdateAbstraction)
      .then(function () {
        deferred.resolve({ message: Message.SUCCESS_UPDATING_ACTIVITY });
      })
      .catch(function () {
        deferred.reject(Exception.ACTIVITY_ABSTRACTION_ERROR);
      });

    return deferred.promise;
  };

  var getActivityAbstraction = function (activityId) {
    var deferred = Q.defer();

    var querySelectActivityResearch = {
      select: '-_id abstraction',
      where: ['_id'],
      conditions: [activityId]
    };

    Activity.queryInActivities(querySelectActivityResearch)
      .then(function (activities) {
        var selectedActivity = activities[0];
        deferred.resolve({ abstraction: selectedActivity.abstraction });
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  module.exports = {
    saveActivityAbstraction: saveActivityAbstraction,
    getActivityAbstraction: getActivityAbstraction
  };
}());
