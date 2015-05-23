(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblActivity', ['$location', 'activityService', 'notificationService', function ($location, activityService, notificationService) {
      return {
        retrict: 'E',
        templateUrl: '/shared/activity/activity.tpl.html'
      };
    }]);
}());
