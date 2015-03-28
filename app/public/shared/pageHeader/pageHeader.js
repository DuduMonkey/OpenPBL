angular.module('openpbl.directives')
  .directive('pageHeader', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/shared/pageHeader/pageHeader.tpl.html',
      link: function () {
        
      }
    }
  });
