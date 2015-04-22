(function () {
  'use strict';

  //Modules in use
  var Q = require('q');
  var Exception = require('./Exceptions');

  /** Parse the raw body to JSON using tf8 encoding **/
  var parseRawRequestToJSON = function (req) {
    var deferred = Q.defer();

    req.setEncoding('utf8');
    var jsonData = null;

    req.on('data', function (chunk) {
      jsonData = JSON.parse(chunk);
      if (!!jsonData) {
        deferred.resolve(jsonData);
      }
      deferred.reject(Exception.PARSE_TO_JSON_EXCEPTION);
    });

    return deferred.promise;
  };

  /** Verify if the passed JSON Object has no property **/
  var isEmptyJSON = function (JSONobject) {
    return !Object.keys(JSONobject).length;
  };

  module.exports = {
    parseRawRequestToJSON: parseRawRequestToJSON,
    isEmptyJSON: isEmptyJSON
  };
}());
