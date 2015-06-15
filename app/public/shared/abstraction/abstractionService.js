(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('abstractionService', ['$http', '$q', 'globalValues', function ($http, $q, globalValues) {
      var addAbstraction = function (activityId, abstraction) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/abstraction'
        , data = {
          abstraction: abstraction
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

      var getAbstraction = function (activityId) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/abstraction';

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
        addAbstraction: addAbstraction,
        getAbstraction: getAbstraction
      };
    }]);
})();
