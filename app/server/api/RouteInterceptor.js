/*global module, require*/
(function () {
  'use strict';

  // Modules in use
  var TokenValidator = require('../token/TokenValidator');
  var ValidatePathSpecification = require('./Specification/ValidPathNotRequireAuthenticationSpec');

  //Token location on header (You can send as X-Pbl-Token)
  var __TOKEN_HEADER = 'x-pbl-token';

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

    var paths = {
      needsAuthentication: [
        '/activity',
        '/'
      ],
      freeFromAuthentication: [
        '/role',
        '/signup',
        '/login'
      ],
      baseUrls: [
        '/api'
      ]
    };

    var ValidPathNotRequireAuthentication = new ValidatePathSpecification(url, baseUrl);

    if (ValidPathNotRequireAuthentication.isSatisfiedBy(paths)) {
      next();
    } else {
      if (!!ValidPathNotRequireAuthentication.FaultReason) {
        res.status(404).send('Invalid Request');
      } else {
        var headerToken = req.headers[__TOKEN_HEADER];
        validateToken(headerToken, next, res);
      }
    }
  };

  //Export the runnable module APIProxy
  module.exports = function (router) {
    router.use(routeMiddleware);
  };
}());
