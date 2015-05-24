(function () {
  'use strict';

  angular.module('openpbl.controllers')
    .controller('ActivityController', ['$location', '$routeParams', '$scope', 'activityService', 'notificationService',
      function ($location, $routeParams, $scope, activityService, notificationService) {

      var backToDashboard = function (reason) {
        notificationService.error('Erro', reason);
        $location.path('/dashboard');
      };

    	$scope.init = function () {
    		var activityId
        , path = $location.path().split('/');

        if (path.length < 3) {
          backToDashboard('ID da atividade inválido');
        }

        activityId = path[2];

        $scope.vm = {};

        if (angular.isDefined(activityId)) {
          activityService.getActivityById(activityId)
            .then(function (response) {
              $scope.vm.activity = response;
            })
            .catch(function (error) {
              backToDashboard(error.messsage);
            });
        }
    	};

    	$scope.init();
    }]);
}());
