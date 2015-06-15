(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('researchService', ['$http', '$q', 'globalValues', function ($http, $q, globalValues) {
      var addResearch = function (activityId, research) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/research'
        , data = {
          research: research
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

      var getResearch = function (activityId) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/getResearch';

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
        addResearch: addResearch,
        getResearch: getResearch
      };
    }]);
})();
