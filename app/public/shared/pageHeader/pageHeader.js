angular.module('openpbl.directives')
  .directive('pblPageHeader', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/shared/pageHeader/pageHeader.tpl.html',
      link: function () {

      }
    }
  });
