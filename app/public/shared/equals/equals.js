(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblEquals', function () {
      return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, element, attrs, ngModel) {
          if (!ngModel) {
            return; // do nothing if no ng-model
          }

          // watch own value and re-validate on change
          scope.$watch(attrs.ngModel, function() {
            validate();
          });

          // observe the other value and re-validate on change
          attrs.$observe('equals', function () {
            validate();
          });

          var validate = function () {
            // values
            var value1 = ngModel.$viewValue;
            var value2 = attrs.equals;

            // set validity
            ngModel.$setValidity('equals', ! value1 || ! value2 || value1 === value2);
          };
        }
      }
    });
})();
