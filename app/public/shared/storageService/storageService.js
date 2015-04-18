(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('storageService', [function () {
      return {
        get: function (key) {
          return localStorage.getItem(key);
        },
        remove: function (key) {
          localStorage.removeItem(key);
        },
        set: function (key, value) {
          return localStorage.setItem(key, value);
        }
      };
    }]);
})();
