(function () {
  'use strict';

  angular.module('openpbl.services')
    .filter('activityProgress', ['globalValues', function (globalValues) {
      return function (status) {
        var activityStatus = globalValues.activity.status;

        switch (status) {
          case activityStatus.CREATING_STORY :
            return '0%';

          case activityStatus.GENERATING_FACTS :
            return '15%';

          case activityStatus.IDENTIFYING_HIPOTESYS :
            return '25%';

          case activityStatus.RESEARCHING :
            return '35%';

          case activityStatus.RESOLVING_PROBLEM :
            return '70%';

          case activityStatus.ABSTRACTING :
            return '90%';

          case activityStatus.FINISHED :
            return '100%';

          default:
            return status;
        }
      };
    }]);
})();
