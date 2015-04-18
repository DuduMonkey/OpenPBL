/*global require, exports*/
(function () {
  'use strict';

  // Modules in use
  var user_roles = require('../models/constants/user_role');

  /**
    Send the role constant bundle
  */
  /*jslint unparam: true*/
  exports.get = function (req, res) {
    res.send(user_roles);
  };
  /*jslint unparam: false*/
}());
