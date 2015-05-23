(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblPageHeader', ['$rootScope', '$location', 'appEvents', 'authenticationService', 'menuService',
      function ($rootScope, $location, appEvents, authenticationService, menuService) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: '/shared/pageHeader/pageHeader.tpl.html',
        link: function (scope) {
          scope.init = function () {
            scope.isAuthenticated = authenticationService.isAuthenticated();
            scope.loadMenu();
            scope.vm = {};

            if (scope.isAuthenticated === true) {
              scope.vm.user = authenticationService.getUser();
            }
          };

          scope.loadMenu = function () {
            scope.menuItems = [];
            var menuItems = menuService.getMenuItems();
            var menuItem = null;
            
            for (var i = 0, length = menuItems.length; i < length; i++) {
              menuItem = menuItems[i];

              if (menuItem.authenticated === scope.isAuthenticated || menuItem.authenticated === false) {
                scope.menuItems.push(menuItem);
              }
            }
          };

          scope.openLogin = function () {
            angular.element('#loginModal').modal('show');
          };

          scope.logout = function () {
            authenticationService.logout();
            $location.path('/');
          };

          // Tratar eventos de login e logout
          [appEvents.USER_LOGIN, appEvents.USER_LOGOUT]
            .forEach(function (event) {
              $rootScope.$on(event, function () {
                scope.isAuthenticated = authenticationService.isAuthenticated();
                scope.loadMenu();
              });
          });

          scope.init();
        }
      };
    }]);
}());
