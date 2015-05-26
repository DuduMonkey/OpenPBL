(function () {
  'use strict';

  var Q = require('q');

  function ActivityListStrategy () {

    var getTeacherActivities = function (userId) {
      var deferred = Q.defer();
      //find all activities from user and populate participants
      return deferred.promise;
    };

    var getStudentActivities = function (userId) {
      var deferred = Q.defer();
      //find all activities where user in and populate participants
      return deferred.promise;
    };

    var getUserActivities = function (user) {
      var deferred = Q.defer();
      //switch
        //case teacher
          //return getTeacherActivities(user._id)
        //case student
          //return getStudentActivities(user._id)
      return deferred.promise;
    };

    return {
      getUserActivities: getUserActivities
    };
  }

  module.exports = ActivityListStrategy;
}());
