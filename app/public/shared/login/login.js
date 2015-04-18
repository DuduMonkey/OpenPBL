(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblLogin', ['loginService', 'notificationService', 'registerService', 'roleService', function (loginService, notificationService, registerService, roleService) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: '/shared/login/login.tpl.html',
        link: function (scope) {
          var resetModels = function () {
            scope.login = {};
            scope.register = {};
          };

          scope.login = function () {
            if (angular.isDefined(scope.login)) {
              loginService.login(scope.login.email, scope.login.password)
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
            scope.modal = {
              login: {
                confirmAction: scope.login,
                confirmButton: "Login",
                title: "Login"
              },
              register: {
                confirmAction: scope.register,
                confirmButton: "Registrar",
                title: "Registre-se"
              },
              mode: {
                login: 'login',
                register: 'register'
              }
            };

            roleService.getRoles()
              .then(function (roles) {
                scope.register.roles = roles;
              })
              .catch(function () {
                console.log('eduardo viado');
              });

            // Default para login
            scope.modalMode = scope.modal.mode.login;

            resetModels();
          };

          scope.register = function () {
            if (angular.isDefined(scope.register)) {
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

          scope.setModalMode = function (mode) {
            scope.modalMode = mode;
            resetModels();
          };

          scope.init();
        }
      };
    }]);
}());
