(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('menuService', [function () {

      return {
        getMenuItems: function () {
          var menuItems = [
            {
              title: 'Início',
              href: '#',
              authenticated: false
            },
            {
              title: 'Painel',
              href: '#/dashboard',
              authenticated: true
            }
          ];

          return menuItems;
        }
      };
    }]);
}());
