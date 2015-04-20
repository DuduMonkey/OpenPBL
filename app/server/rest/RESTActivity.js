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

    activityService.createNewActivity(headerToken, null)
      .then(function (user) {
        res.send(user);
      })
      .catch(function (error) {
        res.send(error);
      });
  };
}());
