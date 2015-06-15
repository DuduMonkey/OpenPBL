(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('activityService', ['$http', '$q', 'factService', 'globalValues', 'hypothesisService', 'participantService', 'resolutionService', 'storyService', 'researchService', 'abstractionService',
      function ($http, $q, factService, globalValues, hypothesisService, participantService, resolutionService, storyService, researchService, abstractionService) {

      var addActivityFact = function (activityId, fact) {
        return factService.addFact(activityId, fact);
      };

      var addActivityHypothesis = function (activityId, hypothesis) {
        return hypothesisService.addHypothesis(activityId, hypothesis);
      };

      var addActivityResolution = function (activityId, resolution) {
        return resolutionService.addResolution(activityId, resolution);
      };

      var saveActivityStory = function (activityId, story) {
        return storyService.addStory(activityId, story);
      };

      var addActivityParticipant = function (activityId, participant) {
        return participantService.addParticipant(activityId, participant);
      };

      var saveActivityResearch = function (activityId, research) {
        return researchService.addResearch(activityId, research);
      };

      var saveActivityAbstraction = function (activityId, abstraction) {
        return abstractionService.addAbstraction(activityId, abstraction);
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
        return hypothesisService.deleteHypothesis(activityId, hypothesisId);
      };

      var deleteActivityPartipant = function (activityId, participantId) {
        return participantService.deleteParticipant(activityId, participantId);
      };

      var deleteActivityResolution = function (activityId, resolutionId) {
        return resolutionService.deleteResolution(activityId, resolutionId);
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

      var getActivityStatusData = function (activityId, status) {
        var deferred = $q.defer()
        , statusPropertyName = getStatusPropertyName(status)
        , url = globalValues.API_URL + '/activity/' + activityId + '/' + statusPropertyName;

        $http.get(url)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      };

      var getStatusPropertyName = function (status) {
        var activityStatus = globalValues.activity.status;

        switch (status) {
          case activityStatus.CREATING_STORY:
            return 'story';

          case activityStatus.GENERATING_FACTS:
            return 'fact';

          case activityStatus.IDENTIFYING_HIPOTESYS:
            return 'hypothesis';

          case activityStatus.RESEARCHING:
            return 'research';

          case activityStatus.RESOLVING_PROBLEM:
            return 'resolution';

          case activityStatus.ABSTRACTING:
            return 'abstraction';

          case activityStatus.FINISHED:
            return 'finished';

          default:
            throw new Error('Status inválido');
        }
      };

      var getActivityStories = function (activityId) {
        return storyService.deleteStories(activityId);
      };

      var nextStatus = function (activityId, status) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId
        , data = {
          status: status
        };

        $http.put(url, data)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
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
        addActivityResolution: addActivityResolution,
        saveActivityStory: saveActivityStory,
        saveActivityResearch: saveActivityResearch,
        saveActivityAbstraction: saveActivityAbstraction,
        deleteActivity: deleteActivity,
        deleteActivityFact: deleteActivityFact,
        deleteActivityHypothesis: deleteActivityHypothesis,
        deleteActivityPartipant: deleteActivityPartipant,
        deleteActivityResolution: deleteActivityResolution,
        deleteActivityStory: deleteActivityStory,
        getActivities: getActivities,
        getActivityById: getActivityById,
        getActivityFacts: getActivityFacts, 
        getActivityHypotheses: getActivityHypotheses,
        getActivityParticipants: getActivityParticipants,
        getActivityStatusData: getActivityStatusData,
        getStatusPropertyName: getStatusPropertyName,
        getActivityStories: getActivityStories,
        nextStatus: nextStatus,
        saveActivity: saveActivity
      };
    }]);
})();
