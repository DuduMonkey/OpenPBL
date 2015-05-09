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
        .when('/activity/:id', {
          templateUrl: 'sections/activity/activity.html',
          controller: 'ActivityController'
        })
        .when('/about', {
          templateUrl:'sections/about/about.html'
        })
        .when('/help', {
          templateUrl:'sections/help/help.html'
        })
        .when('/pbl', {
          templateUrl:'sections/pbl/pbl.html'
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
    $rootScope.$on('$routeChangeStart', function (event, next) {
      var noAuth = ['/about', '/help', '/pbl']
      , requiresAuth = true
      , route = null;

      if (angular.isDefined(next.$$route)) {
        route = next.$$route.originalPath;

        for (var i = 0, length = noAuth.length; i < length; i++) {
          if (route === noAuth[i]) {
            requiresAuth = false;
            break;
          }
        }
      }

      if (requiresAuth === true && authenticationService.isAuthenticated() !== true) {
        $location.path('/');
      }
    });
  }]);
}());
