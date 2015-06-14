(function () {
  'use strict';

  var ValidPathNotRequireAuthenticationSpec = function (url, baseUrl) {
    var needsAuthentication = [];
    var freeFromAuthentication = [];
    var baseUrls = [];
    var instanceOfSpecification = this;

    this.FaultReason = null;

    var baseUrlIsPageContent = function () {
      return baseUrls.indexOf(baseUrl) <= -1;
    };

    var urlIsValid = function () {
      var urlRegex = /^\/+[a-z]+/gi;
      var specificUrl = !!url.match(urlRegex) ? url.match(urlRegex)[0] : null;

      if (needsAuthentication.indexOf(specificUrl) > -1 || freeFromAuthentication.indexOf(specificUrl) > -1 || !specificUrl) {
        return true;
      }

      instanceOfSpecification.FaultReason = 404;

      return false;
    };

    var urlIsFreeFromAuthentication = function () {
      var urlRegex = /^\/+[a-z]+/gi;
      var specificUrl = !!url.match(urlRegex) ? url.match(urlRegex)[0] : null;

      return freeFromAuthentication.indexOf(specificUrl) > -1;
    };

    this.isSatisfiedBy = function (paths) {
      needsAuthentication = paths.needsAuthentication;
      freeFromAuthentication = paths.freeFromAuthentication;
      baseUrls = paths.baseUrls;

      if (baseUrlIsPageContent()) {
        return true;
      }

      if (urlIsValid() && urlIsFreeFromAuthentication()) {
        return true;
      }

      return false;
    };
  };

  module.exports = ValidPathNotRequireAuthenticationSpec;
}());
