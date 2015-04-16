(function () {
  'use strict';

  angular.module('openpbl')
    .factory('httpInterceptor', ['$q', '$rootScope', 'authenticationService', function($q, $rootScope, authenticationService) {
      return {
        'request': function(config) {
          $rootScope.requestInProgress = true;

          if (authenticationService.isAuthenticated()) {
            var token = authenticationService.getToken();
            config.headers['x-pbl-user-auth'] = token;
          }

          return config;
        },

       'requestError': function(rejection) {
          $rootScope.requestInProgress = false;

          return $q.reject(rejection);
        },

        'response': function(response) {
          $rootScope.requestInProgress = false;

          return response;
        },

       'responseError': function(rejection) {
          $rootScope.requestInProgress = false;

          return $q.reject(rejection);
        }
      };
    }]);
}());
