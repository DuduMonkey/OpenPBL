angular.module('openpbl.directives')
  .directive('pblDashboard', [function () {
    return {
      retrict: 'E',
      replace: true,
      templateUrl: '/shared/dashboard/dashboard.tpl.html'
    }
  }]);
