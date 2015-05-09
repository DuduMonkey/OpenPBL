(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblLogin', ['$location', 'loginService', 'notificationService', 'registerService', 'roleService', function ($location, loginService, notificationService, registerService, roleService) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: '/shared/login/login.tpl.html',
        link: function (scope) {
          var resetModels = function () {
            scope.loginData = {};
            scope.registerData = {};
          };

          scope.login = function () {
            if (angular.isDefined(scope.loginData)) {
              loginService.login(scope.loginData.email, scope.loginData.password)
                .then(function () {
                  scope.init();
                  angular.element('#loginModal').modal('hide');
                  $location.path('/dashboard');
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
                scope.roles = roles;
              });

            // Default para login
            scope.modalMode = scope.modal.mode.login;

            resetModels();
          };

          scope.register = function () {
            var user = scope.registerData;

            // Envia requisição para cadastrar o usuário
            registerService.register(user)
              .then(function (response) {
                notificationService.success(response.message);

                // Tendo feito o cadastro com sucesso, faz login
                // automaticamente do usuário
                scope.loginData.email = user.email;
                scope.loginData.password = user.password;

                scope.login();
              })
              .catch(function (error) {
                notificationService.error(error.message);
              });
          };

          scope.setModalMode = function (mode) {
            scope.currentForm = mode === scope.modal.mode.login ? scope.loginForm : scope.registerDataForm;
            scope.modalMode = mode;
            resetModels();
          };

          scope.init();
        }
      };
    }]);
}());
