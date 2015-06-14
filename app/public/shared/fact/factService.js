(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('factService', ['$http', '$log', '$q', 'globalValues', function ($http, $log, $q, globalValues) {
      var addFact = function (activityId, fact) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/facts'
        , data = {
          fact: fact
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
            $log.debug('getFacts', activityId, response.data.facts);
            deferred.resolve(response.data.facts);
          })
          .catch(function (error) {
            $log.error('getFacts', activityId, error);
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
