(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblSpinner', function () {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: '/shared/spinner/spinner.tpl.html'
      };
    });
}());
