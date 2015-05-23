(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblActivity', [function () {
      return {
        retrict: 'E',
        templateUrl: '/shared/activity/activity.tpl.html'
      };
    }]);
}());
