(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('notificationService', [function () {
      return {
        _message: function (title, message, type) {
          if (angular.isDefined(toastr)) {
            switch (type) {
              case 'error':
                toastr.error(message, title);
                break;

              case 'info':
                toastr.info(message, title);
                break;

              case 'success':
                toastr.success(message, title);
                break;

              case 'warning':
                toastr.warning(message, title);
                break;
            }
          }
        },
        error: function (title, message) {
          return this._message(title, message, 'error');
        },
        info: function (title, message) {
          return this._message(title, message, 'info');
        },
        success: function (title, message) {
          return this._message(title, message, 'success');
        },
        warning: function (title, message) {
          return this._message(title, message, 'warning');
        }
      };
    }]);
})();
