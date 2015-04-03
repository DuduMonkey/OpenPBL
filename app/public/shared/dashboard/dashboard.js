(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblDashboard', ['dashboardService', function (dashboardService) {
      return {
        retrict: 'E',
        replace: true,
        templateUrl: '/shared/dashboard/dashboard.tpl.html',
        link: function (scope) {

          scope.setCurrentTask = function (task) {
            scope.currentTask = task;
          };

          dashboardService.getTasks()
            .then(function (response) {
              scope.tasks = response.data;

              if (scope.tasks && scope.tasks.length > 0) {
                scope.currentTask = scope.tasks[0];
              }
            })
            .catch(function (error) {
              // TODO: tratar erro
            });
        }
      };
    }]);
}());
