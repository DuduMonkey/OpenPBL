(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('registerService', ['$http', '$q', function ($http, $q) {
      return {
        register: function (user) {
          var deferred = $q.defer()
          , url = globalValues.API_URL + '/register';

          $http.post(url, user)
            .then(function (response) {

            })
            .catch(function (error) {

            });

          return deferred.promise;
        }
      };
    }]);
})();
