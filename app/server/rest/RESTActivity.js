/*global require, exports*/
(function () {
  'use strict';

  // Modules in use
  var activityService = require('../services/Activity/ActivityService');
  var activityUserService = require('../services/Activity/User/ActivityUserService');
  var _TOKEN_HEADER = 'x-pbl-token';

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

  exports.getActivityData = function (req, res) {
    var activityId = req.params.id;

    activityService.getActivityBasicData(activityId)
      .then(function (responseBag) {
        res.status(200).send(responseBag);
      })
      .catch(function (error) {
        res.status(400).send(error);
      });
  };
}());
