(function () {
  'use strict';

  angular.module('openpbl.services')
    .filter('postType', ['globalValues', function (globalValues) {
      return function (status) {
        var postType = globalValues.activity.post.type;

        switch (status) {
          case postType.FACT :
            return 'postou um fato';

          case postType.HYPOTHESIS :
            return 'postou uma hipótese';

          case postType.RESOLUTION :
            return 'postou uma resolução';

          default:
            return status;
        }
      };
    }]);
})();
