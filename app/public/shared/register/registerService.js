(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('registerService', ['$http', '$q', 'globalValues', function ($http, $q, globalValues) {
      return {
        register: function (user) {
          var deferred = $q.defer()
          , url = globalValues.API_URL + '/signup';

          $http.post(url, user)
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
})();
