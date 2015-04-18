(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('authenticationService', ['$rootScope', 'globalValues', 'appEvents', 'storageService',
      function ($rootScope, globalValues, appEvents, storageService) {
      return {
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
        },
        setUser: function (user) {
          storageService.set(globalValues.KEY_USER_DATA, user);
        },
        setToken: function (token) {
          storageService.set(globalValues.KEY_AUTHENTICATION_TOKEN, token);
        }
      };
    }]);
})();
