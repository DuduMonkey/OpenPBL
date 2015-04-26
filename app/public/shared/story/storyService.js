(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('storyService', ['$http', '$q', 'globalValues', function ($http, $q, globalValues) {
      var addStory = function (activityId, story) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/story';

        $http.post(url, story)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      };

      var deleteStory = function (activityId, storyId) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/story/' + storyId;

        $http.delete(url)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      };

      var getStories = function (activityId) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/story';

        $http.get(url, { cache: false })
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      };

      return {
        addStory: addStory,
        deleteStory: deleteStory,
        getStories: getStories
      };
    }]);
})();
