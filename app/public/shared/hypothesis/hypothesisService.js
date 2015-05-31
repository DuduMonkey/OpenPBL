(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('hypothesisService', ['$http', '$q', function ($http, $q) {
      var addHypothesis = function (activityId, hypothesis) {
        var deferred = $q.defer()
        //, url = globalValues.API_URL + '/activity/' + activityId + '/hypothesis';
        , url = 'http://private-74203b-openpbl.apiary-mock.com/api' + '/activity/' + activityId + '/hypothesis';

        $http.post(url, hypothesis)
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
        //, url = globalValues.API_URL + '/activity/' + activityId + '/hypothesis/' + hypothesisId;
        , url = 'http://private-74203b-openpbl.apiary-mock.com/api' + '/activity/' + activityId + '/hypothesis/' + hypothesisId;

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
        //, url = globalValues.API_URL + '/activity/' + activityId + '/hypothesis';
        , url = 'http://private-74203b-openpbl.apiary-mock.com/api' + '/activity/' + activityId + '/hypothesis';

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
