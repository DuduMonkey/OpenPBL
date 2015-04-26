/*global module, require*/
(function () {
  'use strict';

  // Modules in use
  var TokenValidator = require('../token/TokenValidator');

  //Token location on header (You can send as X-Pbl-Token)
  var __TOKEN_HEADER = 'x-pbl-token';

  /**
    Validate if the requested path needs authentication
    Requested path is free from authentication case:
        Base url are doesnt have exists (/api)
        Url are listed as free from authentication
    Otherwise, it needs authentication
  */
  var pathNeedsAuthentication = function (url, baseUrl) {
    var freeFromAuthenticationPaths = [
      '/signup',
      '/login',
      '/role',
    ];

    if (!baseUrl) {
      return false;
    }
    var freeFromAuthentication = (freeFromAuthenticationPaths.indexOf(url) > -1);
    if (freeFromAuthentication) {
      return false;
    }
    return true;
  };

  /**
    Validate the token candidate, if the token are invalid
    send HTTP status 401
  */
  var validateToken = function (tokenCandidate, next, res) {
    TokenValidator.validateToken(tokenCandidate)
      .then(function () {
        next();
      })
      .catch(function (error) {
        res.status(401).send(error);
      });
  };

  /**
    "Where the magic happens"
    All the requests pass throught this function
  */
  var routeMiddleware = function (req, res, next) {
    var url = req.url;
    var baseUrl = req.baseUrl;

    if (pathNeedsAuthentication(url, baseUrl)) {
      var headerToken = req.headers[__TOKEN_HEADER];
      validateToken(headerToken, next, res);
    } else {
      next();
    }
  };

  //Export the runnable module APIProxy
  module.exports = function (router) {
    router.use(routeMiddleware);
  };
}());
