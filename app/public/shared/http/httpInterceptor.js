(function () {
  'use strict';

  angular.module('openpbl')
    .factory('httpInterceptor', ['$q', '$rootScope', 'authenticationService', function($q, $rootScope, authenticationService) {
      return {
        'request': function(config) {
          $rootScope.requestInProgress = true;

          if (authenticationService.isAuthenticated()) {
            var token = authenticationService.getToken();

            if (angular.isDefined(token)) {
              config.headers['X-Pbl-Token'] = token;
            }
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
