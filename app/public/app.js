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

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode({ requireBase: true });
}]);
