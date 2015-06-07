(function () {
  'use strict';

  var userService = require('../../User/UserService');
  var factService = require('./PostServices/FactService');
  var hypothesisService = require('./PostServices/HypothesisService');
  var resolutionService = require('./PostServices/ResolutionService');
  var Exception = require('../../../shared/Exceptions');
  var TYPE = require('../../../models/constants/post_type');
  var Q = require('q');

  var getInstanceOf = function (serviceType) {
    switch (serviceType) {
    case TYPE.FACT:
      return new factService();
    case TYPE.HYPOTHESIS:
      return new hypothesisService();
    case TYPE.RESOLUTION:
      return new resolutionService();
    default:
      deferred.reject(Exception.ACTIVITY_POST_CREATING_ERROR);
      break;
    }    
  };  

  var usingServiceOfType = function (serviceType) {

    var serviceInstance = getInstanceOf(serviceType);

    var insertNewPost = function (token, activityId, postViewData) {
      var deferred = Q.defer();

      userService.getSessionUser(token)
        .then(function (user) {

          var postData = {
            activityId: activityId,
            userId: user._id,
            content: postViewData.content
          };

          return serviceInstance.savePostOnDatabase(postData);

        })
        .then(function (response) {
          deferred.resolve(response);
        })
        .catch(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };    

    return {
      insertNewPost: insertNewPost
    };

  };

  module.exports = {
    usingServiceOfType: usingServiceOfType
  }

}());
