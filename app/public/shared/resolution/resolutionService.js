(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('resolutionService', ['$http', '$q', function ($http, $q) {
      var addResolution = function (activityId, resolution) {
        var deferred = $q.defer()
        //, url = globalValues.API_URL + '/activity/' + activityId + '/resolutions'
        , url = 'http://private-74203b-openpbl.apiary-mock.com/api' + '/activity/' + activityId + '/resolutions'
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
        //, url = globalValues.API_URL + '/activity/' + activityId + '/resolutions/' + resolutionId;
        , url = 'http://private-74203b-openpbl.apiary-mock.com/api' + '/activity/' + activityId + '/resolutions/' + resolutionId;

        $http.delete(url)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      };

      var getResolutions = function (activityId) {
        var deferred = $q.defer()
        //, url = globalValues.API_URL + '/activity/' + activityId + '/facts';
        , url = 'http://private-74203b-openpbl.apiary-mock.com/api' + '/activity/' + activityId + '/resolutions';

        $http.get(url, { cache: false })
          .then(function (response) {
            deferred.resolve(response.data.resolutions);
          })
          .catch(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      };

      return {
        addResolution: addResolution,
        deleteResolution: deleteResolution,
        getResolutions: getResolutions
      };
    }]);
})();
