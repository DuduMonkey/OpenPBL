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
      .when('/dashboard/teacher', {
        templateUrl: 'sections/dashboard/teacher/teacher.html',
        controller: 'DashboardTeacherController'
      })
      .when('/dashboard/student', {
        templateUrl: 'sections/dashboard/student/student.html',
        controller: 'DashboardStudentController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

app.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.html5Mode({ requireBase: true });
  }]);
