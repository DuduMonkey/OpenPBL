(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('hypothesisService', ['$http', '$q', 'globalValues', function ($http, $q, globalValues) {
      var addHypothesis = function (activityId, hypothesis) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/hypothesis'
        , data = {
          hypothesis: hypothesis
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

      var deleteHypothesis = function (activityId, hypothesisId) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/hypothesis/' + hypothesisId;

        $http.delete(url)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      };

      var getHypotheses = function (activityId) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/hypothesis';

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
        addHypothesis: addHypothesis,
        deleteHypothesis: deleteHypothesis,
        getHypotheses: getHypotheses
      };
    }]);
})();
