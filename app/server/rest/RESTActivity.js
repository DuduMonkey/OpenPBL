/*global require, exports*/
(function () {
  'use strict';

  // Modules in use
  var activityService = require('../services/ActivityService');
  var _TOKEN_HEADER = 'x-pbl-token';

  /**
    Define the post action for user authentication
    Return HTTP status 200 and the session token on valid authentication
  */
  exports.post = function (req, res) {
    var headerToken = req.headers[_TOKEN_HEADER];

    activityService.createNewActivity(headerToken, req.body)
      .then(function (responseBag) {
        res.status(200).send(responseBag);
      })
      .catch(function (error) {
        res.status(418).send(error);
      });
  };

  exports.list = function (req, res) {
    var headerToken = req.headers[_TOKEN_HEADER];

    activityService.getTeacherActivities(headerToken)
      .then(function (responseBag) {
        res.status(200).send(responseBag);
      })
      .catch(function (error) {
        res.status(418).send(error);
      });
  };

  exports.delete = function (req, res) {
    var activityId = req.params.id;

    activityService.deleteActivity(activityId)
      .then(function () {
        res.status(204).send();
      })
      .catch(function (error) {
        res.status(400).send(error);
      });
  };

}());
