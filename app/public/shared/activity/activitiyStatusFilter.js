(function () {
  'use strict';

  angular.module('openpbl.services')
    .filter('activityStatus', ['globalValues', function (globalValues) {
      return function (status) {
        var activityStatus = globalValues.activity.status;

        switch (status) {
          case activityStatus.CREATING_STORY :
            return 'Problema';

          case activityStatus.GENERATING_FACTS :
            return 'Fatos';

          case activityStatus.IDENTIFYING_HIPOTESYS :
            return 'Hipóteses';

          case activityStatus.RESEARCHING :
            return 'Pesquisa';

          case activityStatus.RESOLVING_PROBLEM :
            return 'Resolução';

          case activityStatus.ABSTRACTING :
            return 'Abstração';

          case activityStatus.FINISHED :
            return 'Encerrada';

          default:
            return status;
        }
      };
    }]);
})();
