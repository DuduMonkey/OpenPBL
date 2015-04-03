'use strict';

angular.module('openpbl')
  .factory('httpInterceptor', ['$q', '$rootScope', function($q, $rootScope) {
    return {
      'request': function(config) {
        $rootScope.requestInProgress = true;

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
    }
  }]);
