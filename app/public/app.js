'use strict';

var app = angular.module('openpbl', ['ngRoute', 'ngMaterial', 'openpbl.controllers']);

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

app.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.html5Mode({ requireBase: true });
  }]);
