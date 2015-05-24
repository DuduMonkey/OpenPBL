(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblActivity', ['$q', 'activityService', 'notificationService', 
      function ($q, activityService, notificationService) {
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
              })
              .catch(function (error) {
                notificationService.error('Erro', error);
              });
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
