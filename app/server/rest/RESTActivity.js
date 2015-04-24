/*global require, exports*/
(function () {
  'use strict';

  // Modules in use
  var activityService = require('../services/ActivityService');
  var jsonHelper = require('../shared/JSONHelper');
  var _TOKEN_HEADER = 'x-pbl-token';

  /**
    Define the post action for user authentication
    Return HTTP status 200 and the session token on valid authentication
  */
  exports.post = function (req, res) {
    var headerToken = req.headers[_TOKEN_HEADER];

    jsonHelper.parseRawRequestToJSON(req)
      .then(function (requestBody) {
        return activityService.createNewActivity(headerToken, requestBody);
      })
      .then(function (responseBag) {
        res.send(responseBag);
      })
      .catch(function (error) {
        res.status(418).send(error);
      });
  };

  exports.list = function (req, res) {
    var headerToken = req.headers[_TOKEN_HEADER];

    activityService.getTeacherActivities(headerToken)
      .then(function (responseBag) {
        res.send(responseBag);
      })
      .catch(function (error) {
        res.status(418).send(error);
      });
  };

}());
