(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblDashboard', ['$location', '$timeout', 'activityService', 'notificationService', function ($location, $timeout, activityService, notificationService) {
      return {
        retrict: 'E',
        replace: true,
        templateUrl: '/shared/dashboard/dashboard.tpl.html',
        link: function (scope) {

          scope.addNewParticipant = function (participantEmail) {
            var activityId = scope.currentActivity.id;

            activityService.addActivityParticipant(activityId, participantEmail)
              .then(function (response) {
                scope.newParticipant = {};

                // Recarrega as atividades sem alterar a atividade
                // selecionada
                scope.getActivities(false);
                notificationService.success(response.message);
                scope.toggleModal('#addParicipantModal');
              })
              .catch(function (error) {
                notificationService.error(error.message);
              });
          };

          scope.addNewParticipantToNewActivity = function (participantEmail) {
            var newParticipant = {
              email: participantEmail
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

            scope.toggleModal('#newActivityModal');
          };

          scope.deleteActivity = function () {
            var activityId = scope.currentActivity.id;

            activityService.deleteActivity(activityId)
              .then(function (response) {
                notificationService.success(response.message);
                scope.toggleModal('#deleteActivityModal');
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

          scope.openNewParticipantModal = function () {
            scope.toggleModal('#addParicipantModal');
          };

          scope.openComfirmActivityDeleteModal = function () {
            scope.toggleModal('#deleteActivityModal');
          };

          scope.removeNewParticipant = function (index) {
            if (!!scope.newActivity && Array.isArray(scope.newActivity.participants)) {
              scope.newActivity.participants.splice(index, 1);
            }
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
                scope.toggleModal('#newActivityModal');
                
                var delayed = function () {
                  scope.openActivity(response.id);
                };

                $timeout(delayed, 400);
              })
              .catch(function (error) {
                notificationService.error(error);
              });
          };

          scope.setCurrentActivity = function (activity) {
            scope.currentActivity = activity;
          };

          scope.toggleModal = function (modalName) {
            angular.element(modalName).modal('toggle');
          };

          scope.init();
        }
      };
    }]);
}());
