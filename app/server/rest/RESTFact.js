/*global require, exports*/
(function () {
  'use strict';

  // Modules in use
  var postService = require('../services/Activity/Fact/PostService');
  var TYPE = require('../models/constants/post_type');
  var _TOKEN_HEADER = 'x-pbl-token';
  /**
    Define the post action for user authentication
    Return HTTP status 200 and the session token on valid authentication
  */
  exports.post = function (req, res) {
    var headerToken = req.headers[_TOKEN_HEADER];
    var activityId = req.params.id;

    postService.createNewPost(headerToken, activityId, req.body, TYPE.FACT)
      .then(function (responseBag) {
        res.status(200).send(responseBag);
      })
      .catch(function (error) {
        res.status(400).send(error);
      });
  };

}());
