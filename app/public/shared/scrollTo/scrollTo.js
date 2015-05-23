(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblScrollTo', [function () {
      return {
        restrict: 'A',
        scope: {
          target: '@pblScrollTo'
        },
        link: function (scope, element, attrs) {
          var time = attrs.time || 1000;

          element.on('click', function (event) {
            event.stopPropagation();

            $('html, body').animate({
                scrollTop: $(scope.target).offset().top
            }, time);
          });
        }
      };
    }]);
})();
