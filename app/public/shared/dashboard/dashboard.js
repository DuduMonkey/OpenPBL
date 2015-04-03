(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblDashboard', ['dashboardService', function (dashboardService) {
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

          scope.createnewActivity = function () {
            scope.newActivity = {
              name: '',
              summary: '',
              status: '',
              participants: []
            };

            scope.toggleModal();
          };

          scope.getActivities = function () {
            dashboardService.getActivities()
              .then(function (response) {
                scope.activities = response;

                if (scope.activities && scope.activities.length > 0) {
                  scope.setCurrentActivity(scope.activities[0]);
                }
              })
              .catch(function (error) {
                // TODO: tratar erro
              });
          };

          scope.init = function () {
            scope.getActivities();
          };

          scope.removeParticipant = function (index) {
            if (index <= scope.newActivity.participants.length) {
              scope.newActivity.participants.splice(index, 1);
            }
          };

          scope.saveTask = function () {
            dashboardService.saveActivity(scope.newActivity)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
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
