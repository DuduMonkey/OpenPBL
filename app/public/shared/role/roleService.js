(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('roleService', ['$http', '$q', 'globalValues', function ($http, $q, globalValues) {
      return {
        getRoles: function () {
          var deferred = $q.defer()
          , url = globalValues.API_URL + '/roles';

          $http.get(url)
            .then(function (response) {
              deferred.resolve(response.data.roles);
            })
            .catch(function (error) {
              deferred.reject(error);
            });

          return deferred.promise;
        }
      };
    }]);
})();
