'use strict';

angular.module('openpbl.directives')
  .directive('pblDashboard', ['dashboardService', function (dashboardService) {
    return {
      retrict: 'E',
      replace: true,
      templateUrl: '/shared/dashboard/dashboard.tpl.html',
      link: function (scope) {

        dashboardService.getTasks()
          .then(function (response) {
            scope.tasks = response.data;
          })
          .catch(function (error) {
            alert(error);
          });
      }
    }
  }]);
