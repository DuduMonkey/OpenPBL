/*global require, exports*/
(function () {
  'use strict';

  var researchService = require('../services/Activity/Research/ResearchService');

  exports.post = function (req, res) {
    var activityId = req.params.id;

    researchService.saveActivityResearch(activityId, req.body)
      .then(function (responseBag) {
        res.status(200).send(responseBag);
      })
      .catch(function (error) {
        res.status(400).send(error);
      });
  };

  exports.get = function (req, res) {
    var activityId = req.params.id;

    researchService.getActivityResearch(activityId)
      .then(function (responseBag) {
        res.status(200).send(responseBag);
      })
      .catch(function (error) {
        res.status(400).send(error);
      });
  };

}());
