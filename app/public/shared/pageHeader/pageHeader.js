'use strict';

angular.module('openpbl.directives')
  .directive('pblPageHeader', ['menuService', function (menuService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/shared/pageHeader/pageHeader.tpl.html',
      link: function (scope) {
        scope.menuItems = menuService.getMenuItems();
      }
    }
  }]);
