(function () {
  'use strict';

  var app = angular.module('openpbl', ['ngRoute', 'openpbl.controllers']);

  /**
   * Rotas
   */
  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/dashboard', {
          templateUrl: 'sections/dashboard/dashboard.html',
          controller: 'DashboardController'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);

  /**
   * HTTP Provider
   */
  app.config(['$httpProvider', function($httpProvider) {

      // Configuração necessária para habilitar o CORS
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

      // HTTP Interceptor
      $httpProvider.interceptors.push('httpInterceptor');
    }
  ]);

  /**
   * Location Provider
   */
  app.config(['$locationProvider', function($locationProvider) {

    // Configuração necessária para habilitar o CORS
    $locationProvider.html5Mode({ requireBase: true });
  }]);

  app.run(['$rootScope', '$location', 'authenticationService', function($rootScope, $location, authenticationService) {
    $rootScope.$on('$routeChangeStart', function() {
      if (authenticationService.isAuthenticated() !== true) {
        $location.path('/');
      }
    });
  }]);
}());
