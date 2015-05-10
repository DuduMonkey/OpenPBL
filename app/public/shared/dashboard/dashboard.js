(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblDashboard', ['$location', 'activityService', 'notificationService', function ($location, activityService, notificationService) {
      return {
        retrict: 'E',
        replace: true,
        templateUrl: '/shared/dashboard/dashboard.tpl.html',
        link: function (scope) {

          scope.addNewParticipant = function (participant) {
            var newParticipant = {
              email: participant
            };

            scope.newActivity.participants.push(newParticipant);
            scope.newActivity.participant = null;
          };

          scope.createNewActivity = function () {
            scope.newActivity = {
              name: '',
              summary: '',
              status: '',
              participants: []
            };

            scope.toggleModal();
          };

          scope.deleteActivity = function (activityId) {
            activityService.deleteActivity(activityId)
              .then(function (response) {
                notificationService.success(response.message);
                scope.init();
              })
              .catch(function (error) {
                notificationService.error(error.message);
              });
          };

          scope.getActivities = function (setCurrentActivity) {
            setCurrentActivity = angular.isDefined(setCurrentActivity) ? setCurrentActivity : true;

            activityService.getActivities()
              .then(function (response) {
                scope.activities = response;

                if (scope.activities && scope.activities.active.length > 0) {
                  scope.setCurrentActivity(scope.activities.active[0]);
                }
              })
              .catch(function (error) {
                notificationService.error('Erro', error);
              });
          };

          scope.init = function () {
            scope.getActivities();
          };

          scope.openActivity = function (id) {
            var route = '/activity/' + id;
            console.log('openActivity', route);
            $location.path(route);
          };

          scope.removeParticipant = function (participantId) {
            var activityId = scope.currentActivity.id;

            activityService.deleteActivityPartipant(activityId, participantId)
              .then(function (response) {

                // Recarrega as atividades sem alterar a atividade
                // selecionada
                scope.getActivities(false);

                notificationService.success(response.message);
              })
              .catch(function (error) {
                notificationService.error(error.message);
              });
          };

          scope.saveActivity = function () {
            activityService.saveActivity(scope.newActivity)
              .then(function (response) {
                notificationService.success(response.message);
                scope.toggleModal();
                scope.getActivities();
              })
              .catch(function (error) {
                notificationService.error(error);
              });
          };

          scope.setCurrentActivity = function (activity) {
            scope.currentActivity = activity;
          };

          scope.toggleModal = function () {
            angular.element('#newActivityModal').modal('toggle');
          };

          scope.init();
        }
      };
    }]);
}());
