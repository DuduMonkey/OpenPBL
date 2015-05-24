(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblSvg', ['globalValues', function (globalValues) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          svgFileName: '@name'
        },
        templateUrl: 'shared/svg/svg.tpl.html',
        link: function (scope) {
          var basePath = globalValues.ASSET_SVG_BASE_PATH;
          scope.filePath = basePath + '/' + scope.svgFileName + '.svg';
        }
      };
    }]);
})();
