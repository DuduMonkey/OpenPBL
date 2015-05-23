(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('activityService', ['$http', '$q', 'factService', 'globalValues', 'hypothesisService', 'participantService', 'storyService',
      function ($http, $q, factService, globalValues, hypothesisService, participantService, storyService) {

      var addActivityFact = function (activityId, fact) {
        return factService.addFact(activityId, fact);
      };

      var addActivityHypothesis = function (activityId, hypothesis) {
        return hypothesisService.addHypothesis(activityId, hypothesis);
      };

      var addActivityStory = function (activityId, story) {
        return storyService.addStory(activityId, story);
      };

      var addActivityParticipant = function (activityId, participant) {
        return participantService.addParticipant(activityId, participant);
      };

      var deleteActivity = function (activityId) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId;

        $http.delete(url)
          .then(function () {
            var response = {
              message: 'Atividade removida com sucesso'
            };

            deferred.resolve(response);
          })
          .catch(function (error) {
            deferred.reject(error);
          });

          return deferred.promise;
      };

      var deleteActivityFact = function (activityId, factId) {
        return factService.deleteFact(activityId, factId);
      };

      var deleteActivityHypothesis = function (activityId, hypothesisId) {
        return hypothesisService.deleteHypothesis(hypothesisId);
      };

      var deleteActivityPartipant = function (activityId, participantId) {
        return participantService.deleteParticipant(activityId, participantId);
      };

      var deleteActivityStory = function (activityId, storyId) {
        return storyService.deleteStory(activityId, storyId);
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

      var getActivityById = function (activityId) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId;

        $http.get(url)
          .then(function (response) {
            deferred.resolve(response.data);
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

      var getActivityParticipants = function (activityId) {
        return participantService.getParticipants(activityId);
      };

      var getActivityStories = function (activityId) {
        return storyService.deleteStories(activityId);
      };

      var saveActivity = function (activity) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity';

        $http.post(url, activity)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      };

      return {
        addActivityFact: addActivityFact,
        addActivityHypothesis: addActivityHypothesis,
        addActivityParticipant: addActivityParticipant,
        addActivityStory: addActivityStory,
        deleteActivity: deleteActivity,
        deleteActivityFact: deleteActivityFact,
        deleteActivityHypothesis: deleteActivityHypothesis,
        deleteActivityPartipant: deleteActivityPartipant,
        deleteActivityStory: deleteActivityStory,
        getActivities: getActivities,
        getActivityById: getActivityById,
        getActivityFacts: getActivityFacts, 
        getActivityHypotheses: getActivityHypotheses,
        getActivityParticipants: getActivityParticipants,
        getActivityStories: getActivityStories,
        saveActivity: saveActivity
      };
    }]);
})();
