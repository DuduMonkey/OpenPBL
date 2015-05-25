(function () {
  'use strict';

  //modules in use  
  var activityUserService = require('../services/Activity/User/ActivityUserService');

  //var _TOKEN_HEADER = 'x-pbl-token';

  exports.insertUser = function (req, res) {
    var activityId = req.params.id;

    activityUserService.insertNewUser(activityId, req.body.email)
      .then(function (responseBag) {
        res.status(200).send(responseBag);
      })
      .catch(function (error) {
        res.status(400).send(error);
      });
  };

  exports.removeUser = function (req, res) {
    var activityId = req.params.activityId;
    var userId = req.params.userId;

    activityUserService.removeUser(activityId, userId)
      .then(function (responseBag) {
        res.status(200).send(responseBag);
      })
      .catch(function (error) {
        res.status(400).send(error);
      });
  };
}());
