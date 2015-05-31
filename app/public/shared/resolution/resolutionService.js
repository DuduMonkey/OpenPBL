(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('resolutionService', ['$http', '$q', 'globalValues', function ($http, $q, globalValues) {
      var addResolution = function (activityId, resolution) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/resolution'
        , data = {
          activityId: activityId,
          resolution: resolution
        };

        $http.post(url, data)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      };

      var deleteResolution = function (activityId, resolutionId) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/resolution/' + resolutionId;

        $http.delete(url)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      };

      return {
        addResolution: addResolution,
        deleteResolution: deleteResolution
      };
    }]);
})();
