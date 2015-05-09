(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('factService', ['$http', '$q', 'globalValues', function ($http, $q, globalValues) {
      var addFact = function (activityId, fact) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/facts';

        $http.post(url, fact)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      };

      var deleteFact = function (activityId, factId) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/facts/' + factId;

        $http.delete(url)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      };

      var getFacts = function (activityId) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/facts';

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
        addFact: addFact,
        deleteFact: deleteFact,
        getFacts: getFacts
      };
    }]);
})();
