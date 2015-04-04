(function () {
  'use strict';

  angular.module('openpbl')
    .constant('globalValues', {
      API_URL: 'http://private-bec97-openpbl.apiary-mock.com/api',
      APP_NAME: 'OpenPBL',
      APP_VERSION: '1.0.0',
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
    });
}());
