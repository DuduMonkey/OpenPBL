(function () {
  'use strict';

  angular.module('openpbl.controllers')
    .controller('ActivityController', ['$location', '$routeParams', '$scope', 'activityService', 'notificationService',
      function ($location, $routeParams, $scope, activityService, notificationService) {

    	$scope.init = function () {
    		var activityId = $routeParams.id;

        $scope.vm = {};

        if (angular.isDefined(activityId)) {
          activityService.getActivityById(activityId)
            .then(function (response) {
              $scope.vm.activity = response.data;
              console.log('activity', response.data);
            })
            .catch(function (error) {
              notificationService.error(error.message);
              $location.path('/dashboard');
            });
        }
    	};

    	$scope.init();
    }]);
}());
