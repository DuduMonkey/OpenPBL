angular.module('openpbl.directives')
  .directive('pageFooter', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/shared/pageFooter/pageFooter.tpl.html',
      link: function () {
      }
    }
  });
