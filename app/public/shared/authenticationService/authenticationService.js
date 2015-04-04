(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('authenticationService', ['$rootScope', '$http', '$q', 'globalValues', 'appEvents', 'storageService',
      function ($rootScope, $http, $q, globalValues, appEvents, storageService) {
      return {
        authenticate: function (login, password) {
          var deferred = $q.defer();
          var url = globalValues.API_URL + '/login';
          var data = {
            login: login,
            password: password
          };

          $http.post(url, data)
            .then(function (response) {
              var token = response.data.token;
              storageService.set(globalValues.KEY_AUTHENTICATION_TOKEN, token);

              var user = response.data.user;
              storageService.set(globalValues.KEY_USER_DATA, user);

              $rootScope.$broadcast(appEvents.USER_LOGIN);

              deferred.resolve();
            })
            .catch(function (error) {
              deferred.reject(error);
            });

          return deferred.promise;
        },
        getUser: function () {
          var userData = storageService.get(globalValues.KEY_USER_DATA);
          return JSON.parse(userData);
        },
        getToken: function () {
          return storageService.get(globalValues.KEY_AUTHENTICATION_TOKEN);
        },
        isAuthenticated: function () {
          var token = storageService.get(globalValues.KEY_AUTHENTICATION_TOKEN);
          return token !== null;
        },
        logout: function () {
          storageService.remove(globalValues.KEY_USER_DATA);
          storageService.remove(globalValues.KEY_AUTHENTICATION_TOKEN);

          $rootScope.$broadcast(appEvents.USER_LOGOUT);
        }
      };
    }]);
})();
