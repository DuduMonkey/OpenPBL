(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblPermission', ['ngIfDirective', 'authenticationService', function (ngIfDirective, authenticationService) {
      var ngIf = ngIfDirective[0];

      return {
        transclude: ngIf.transclude,
        priority: ngIf.priority,
        terminal: ngIf.terminal,
        restrict: ngIf.restrict,
        link: function($scope, $element, $attr) {
          var value = $attr.pblPermission
          , hasRole = authenticationService.hasRole(value);

          $attr.ngIf = function() {
            return hasRole;
          };

          ngIf.link.apply(ngIf, arguments);
        }
      };
    }]);
}());
