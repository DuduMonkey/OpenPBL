(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('activityService', ['$http', '$q', 'factService', 'globalValues', 'hypothesisService',
      function ($http, $q, factService, globalValues, hypothesisService) {

      var addActivityFact = function (activityId, fact) {
        return factService.addFact(activityId, fact);
      };

      addActivityHypothesis = function (activityId, hypothesis) {
        return hypothesisService.addhypothesis(hypothesis);
      };

      var deleteActivityFact = function (factId) {
        return factService.deleteFact(factId);
      };

      var deleteActivityHypothesis = function (hypothesisId) {
        return hypothesisService.deleteHypothesis(hypothesisId);
      };

      var getActivities = function () {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity';

        $http.get(url, { cache: false })
          .then(function (response) {
            var activities = {
              active: [],
              finished: []
            };

            var activity = null;
            
            for (var i = 0, length = response.data.activities.length; i < length; i++) {
              activity = response.data.activities[i];

              if (activity.status !== globalValues.activity.status.FINISHED) {
                activities.active.push(activity);
              } else {
                activities.finished.push(activity);
              }
            }

            deferred.resolve(activities);
          })
          .catch(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      };

      var getActivityFacts = function (activityId) {
        return factService.getFacts(activityId);
      };

      var getActivityHypotheses = function (activityId) {
        return hypothesisService.getHypotheses(activityId);
      };

      var getActivityStories = function (activityId) {
      };

      var saveActivity = function (activity) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity';

        $http.post(url, activity)
          .then(function (reponse) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          })

        return deferred.promise;
      };

      return {
        addActivityFact: addActivityFact,
        addActivityHypothesis: addActivityHypothesis,
        deleteActivityFact: deleteActivityFact,
        deleteActivityHypothesis: deleteActivityHypothesis,
        getActivities: getActivities,
        getActivityFacts: getActivityFacts, 
        getActivityHypotheses: getActivityHypotheses,
        getActivityStories: getActivityStories,
        saveActivity: saveActivity,
      };
    }]);
})();
