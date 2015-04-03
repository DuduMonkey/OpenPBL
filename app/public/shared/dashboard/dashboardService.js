(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('dashboardService', ['$http', '$q', 'globalValues', function ($http, $q, globalValues) {

      return {
        getTasks: function () {
          var deferred = $q.defer();

          var url = globalValues.API_URL + '/dashboard/full';

          $http.get(url)
            .then(function (response) {
              deferred.resolve({data: response.data.tasks});
            })
            .catch(function (error) {
              deferred.reject(error);
            });

          return deferred.promise;
        }
      };
    }]);
}());
