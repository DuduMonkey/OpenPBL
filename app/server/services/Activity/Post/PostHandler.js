(function () {
  'use strict';

  var userService = require('../../User/UserService');
  var FactService = require('./PostServices/FactService');
  var HypothesisService = require('./PostServices/HypothesisService');
  var ResolutionService = require('./PostServices/ResolutionService');
  var Exception = require('../../../shared/Exceptions');
  var TYPE = require('../../../models/constants/post_type');
  var Q = require('q');

  var getInstanceOf = function (serviceType) {
    switch (serviceType) {
    case TYPE.FACT:
      return new FactService();
    case TYPE.HYPOTHESIS:
      return new HypothesisService();
    case TYPE.RESOLUTION:
      return new ResolutionService();
    default:
      return null;
    }
  };

  var usingServiceOfType = function (serviceType) {

    var serviceInstance = getInstanceOf(serviceType);

    var insertNewPost = function (token, activityId, postViewData) {
      var deferred = Q.defer();

      if (serviceInstance === null) {
        deferred.reject(Exception.ACTIVITY_POST_CREATING_ERROR);
      }

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

    var deletePost = function (postId) {
      var deferred = Q.defer();

      if (serviceInstance === null) {
        deferred.reject(Exception.ACTIVITY_POST_CREATING_ERROR);
      } else {
        return serviceInstance.deletePostOnDatabase(postId);
      }

      return deferred.promise;
    };

    return {
      insertNewPost: insertNewPost,
      deletePost: deletePost
    };

  };

  module.exports = {
    usingServiceOfType: usingServiceOfType
  };

}());
