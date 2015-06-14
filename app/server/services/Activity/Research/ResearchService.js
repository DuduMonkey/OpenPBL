(function () {
  'use strict';

  var Activity = require('../../../models/Activity');
  var Message = require('../../../shared/MessageResource');
  var Exception = require('../../../shared/Exceptions');
  var Q = require('q');

  var saveActivityResearch = function (activityId, researchViewData) {
    var deferred = Q.defer();

    var queryUpdateResearch = {
      $set: {
        research: researchViewData.research
      }
    };

    Activity.updateActivity(activityId, queryUpdateResearch)
      .then(function () {
        deferred.resolve({ message: Message.SUCCESS_UPDATING_ACTIVITY });
      })
      .catch(function () {
        deferred.reject(Exception.ACTIVITY_RESEARCH_ERROR);
      });

    return deferred.promise;
  };

  var getActivityResearch = function (activityId) {
    var deferred = Q.defer();

    var querySelectActivityResearch = {
      select: '-_id research',
      where: ['_id'],
      conditions: [activityId]
    };

    Activity.queryInActivities(querySelectActivityResearch)
      .then(function (activities) {
        var selectedActivity = activities[0];
        deferred.resolve({ research: selectedActivity.research });
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  module.exports = {
    saveActivityResearch: saveActivityResearch,
    getActivityResearch: getActivityResearch
  };
}());
