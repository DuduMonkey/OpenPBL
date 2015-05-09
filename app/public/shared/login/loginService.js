(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('loginService', ['$rootScope', '$http', '$q', 'globalValues', 'appEvents', 'authenticationService',
      function ($rootScope, $http, $q, globalValues, appEvents, authenticationService) {
      return {
        login: function (login, password) {
          var deferred = $q.defer();
          var url = globalValues.API_URL + '/login';
          var data = {
            email: login,
            password: password
          };

          $http.post(url, data)
            .then(function (response) {
              var token = response.data.token;
              authenticationService.setToken(token);
              
              var user = response.data.user;
              authenticationService.setUser(user);

              $rootScope.$broadcast(appEvents.USER_LOGIN);

              deferred.resolve();
            })
            .catch(function (error) {
              deferred.reject(error);
            });

          return deferred.promise;
        }
      };
    }]);
})();
