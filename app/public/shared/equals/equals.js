(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblEquals', function () {
      return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
          if (!ngModel) {
            return;
          }

          scope.$watch(attrs.ngModel, function() {
            validate();
          });

          attrs.$observe('pbl-equals', function () {
            validate();
          });

          var validate = function () {
            var value1 = ngModel.$viewValue
            , value2 = attrs.pblEquals
            , isValid = !!value1 && !!value2 && value1 === value2;

            ngModel.$setValidity('equals', isValid);
          };
        }
      }
    });
})();
