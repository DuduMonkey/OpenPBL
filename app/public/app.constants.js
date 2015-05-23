(function () {
  'use strict';

  angular.module('openpbl')
    .constant('globalValues', {
      API_URL: '/api',
      ASSET_SVG_BASE_PATH: '/assets/svg',
      APP_NAME: 'OpenPBL',
      APP_VERSION: '1.0.0',
      KEY_AUTHENTICATION_TOKEN: '$AUTH_TOKEN',
      KEY_USER_DATA: '$USER_DATA',
      activity: {
        status: {
          CREATING_STORY: 1,
          GENERATING_FACTS: 2,
          IDENTIFYING_HIPOTESYS: 3,
          RESEARCHING: 4,
          RESOLVING_PROBLEM: 5,
          ABSTRACTING: 6,
          FINISHED: 7
        }
      }
    })
    .constant('appEvents', {

      /**
       * Usuário efetua login com sucesso
       */
      USER_LOGIN: 'EVENT_USER_LOGIN',

      /**
       * Usuário sai do sistema
       */
      USER_LOGOUT: 'EVENT_USER_LOGOUT'
    });
}());
