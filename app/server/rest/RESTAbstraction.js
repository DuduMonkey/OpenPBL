/*global require, exports*/
(function () {
  'use strict';

  var abstractionService = require('../services/Activity/Abstraction/AbstractionService');

  exports.post = function (req, res) {
    var activityId = req.params.id;

    abstractionService.saveActivityAbstraction(activityId, req.body)
      .then(function (responseBag) {
        res.status(200).send(responseBag);
      })
      .catch(function (error) {
        res.status(400).send(error);
      });
  };

  exports.get = function (req, res) {
    var activityId = req.params.id;

    abstractionService.getActivityAbstraction(activityId)
      .then(function (responseBag) {
        res.status(200).send(responseBag);
      })
      .catch(function (error) {
        res.status(400).send(error);
      });
  };

}());
