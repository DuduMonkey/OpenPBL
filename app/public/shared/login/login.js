(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblLogin', ['httpService', 'notificationService', function (httpService, notificationService) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: '/shared/login/login.tpl.html',
        link: function (scope) {
          scope.authenticate = function () {
            if (angular.isDefined(scope.login)) {
              httpService.authenticate(scope.login.email, scope.login.password)
                .then(function () {
                  scope.init();
                  angular.element('#loginModal').modal('hide');
                })
                .catch(function (error) {
                  notificationService.error('Erro', error);
                });
            }
          };

          scope.init = function () {
            scope.login = {};
          };

          scope.init();
        }
      };
    }]);
}());
