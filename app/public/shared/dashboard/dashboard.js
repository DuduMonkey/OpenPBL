angular.module('openpbl.directives')
  .directive('dashboard', [function () {
    return {
      retrict: 'E',
      replace: true,
      templateUrl: '/shared/dashboard/dashboard.tpl.html'
    }
  }]);
