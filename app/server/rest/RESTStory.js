/*global require, exports*/
(function () {
  'use strict';

  // Modules in use
  var storyService = require('../services/Activity/Story/StoryService');

  /**
    Define the post action for user authentication
    Return HTTP status 200 and the session token on valid authentication
  */
  exports.post = function (req, res) {
    var activityId = req.params.id;

    storyService.insertActivityStory(activityId, req.body)
      .then(function (responseBag) {
        res.status(200).send(responseBag);
      })
      .catch(function (error) {
        res.status(400).send(error);
      });
  };

}());
