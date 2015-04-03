(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('dashboardService', ['$http', '$q', 'globalValues', function ($http, $q, globalValues) {

      return {
        getActivities: function () {
          var deferred = $q.defer();

          var url = globalValues.API_URL + '/dashboard/activities';

          $http.get(url, { cache: false })
            .then(function (response) {
              deferred.resolve(response.data.activities);
            })
            .catch(function (error) {
              deferred.reject(error);
            });

          return deferred.promise;
        },

        saveActivity: function (task) {
          var deferred = $q.defer();

          var url = globalValues.API_URL + '/dashboard/activity';

          $http.post(url, task)
            .then(function (response) {
              deferred.resolve(response.data);
            })
            .catch(function (error) {
              deferred.reject(error);
            });

          return deferred.promise;
        }
      };
    }]);
}());
