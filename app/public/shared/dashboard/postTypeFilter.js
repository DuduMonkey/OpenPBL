(function () {
  'use strict';

  angular.module('openpbl.services')
    .filter('postType', ['globalValues', function (globalValues) {
      return function (status) {
        var postType = globalValues.activity.post.type;

        switch (status) {
          case postType.FACT :
            return 'Fato';

          case postType.HYPOTHESIS :
            return 'Hipótese';

          case postType.RESOLUTION :
            return 'Resolução';

          default:
            return status;
        }
      };
    }]);
})();
