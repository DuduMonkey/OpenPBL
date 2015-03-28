'use strict';

angular.module('openpbl.services')
  .factory('menuService', [function () {

    return {
      getMenuItems: function () {
        var menuItems = [
          {
            title: 'Início',
            href: '#'
          },
          {
            title: 'Painel',
            href: '#/dashboard'
          },
          {
            title: 'BUCETA',
            href: '#/buceta'
          }
        ];

        return menuItems;
      }
    }
  }]);
