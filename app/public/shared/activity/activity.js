(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblActivity', ['$q', 'activityService', 'globalValues', 'notificationService', 
      function ($q, activityService, globalValues, notificationService) {
      return {
        retrict: 'E',
        templateUrl: '/shared/activity/activity.tpl.html',
        scope: {
          activity: '='
        },
        link: function (scope) {
          var init = function () {
            scope.vm = {};
            loadActivityStatus(scope.activity)
              .then(function (response) {
                scope.vm.activity = response;
                scope.content = getContentTab(scope.vm.activity.status);
              })
              .catch(function (error) {
                notificationService.error('Erro', error);
              });
          };

          var getContentTab = function (status) {
            var activityStatus = globalValues.activity.status;

            switch (status) {
              case activityStatus.CREATING_STORY:
                return 'tab-problem';

              case activityStatus.GENERATING_FACTS:
                return 'tab-facts';

              case activityStatus.IDENTIFYING_HIPOTESYS:
                return 'tab-hypothesis';

              case activityStatus.RESEARCHING:
                return 'tab-research';

              case activityStatus.RESOLVING_PROBLEM:
                return 'tab-resolution';

              case activityStatus.ABSTRACTING:
                return 'tab-abstraction';

              case activityStatus.FINISHED:
                break;
            }
          };

          var loadActivityStatus = function (activity) {
            var deferred = $q.defer()
            , statusName = activityService.getStatusPropertyName(activity.status);

            activityService.getActivityStatusData(activity.id, activity.status)
              .then(function (response) {
                activity[statusName] = response;
                deferred.resolve(activity);
              })
              .catch(function (error) {
                deferred.reject(error);
              });

            return deferred.promise;
          };

          scope.$watch('activity', function () {
            if (angular.isDefined(scope.activity)) {
              init();
            }
          });
        }
      };
    }]);
}());
