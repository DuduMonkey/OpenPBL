(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('factService', ['$http', '$log', '$q', function ($http, $log, $q) {
      var addFact = function (activityId, fact) {
        var deferred = $q.defer()
        //, url = globalValues.API_URL + '/activity/' + activityId + '/facts';
        , url = 'http://private-74203b-openpbl.apiary-mock.com/api' + '/activity/' + activityId + '/facts';

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
        //, url = globalValues.API_URL + '/activity/' + activityId + '/facts/' + factId;
        , url = 'http://private-74203b-openpbl.apiary-mock.com/api' + '/activity/' + activityId + '/facts/' + factId;

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
        //, url = globalValues.API_URL + '/activity/' + activityId + '/facts';
        , url = 'http://private-74203b-openpbl.apiary-mock.com/api' + '/activity/' + activityId + '/facts';

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
