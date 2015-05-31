(function () {
  'use strict';

  var userService = require('../../User/UserService');
  var factService = require('./FactService');
  var Exception = require('../../../shared/Exceptions');
  var TYPE = require('../../../models/constants/post_type');
  var Q = require('q');

  var insertNewPost = function (token, activityId, postViewData, postType) {
    var deferred = Q.defer();

    userService.getSessionUser(token)
      .then(function (user) {

        var postData = {
          activityId: activityId,
          userId: user._id,
          content: postViewData.content
        };

        switch (postType) {
        case TYPE.FACT:
          return factService.createNewFact(postData);
        case TYPE.HYPOTHESIS:
          deferred.reject(Exception.FEATURE_NOT_IMPLEMENTED_EXCEPTION);
          break;
        case TYPE.RESOLUTION:
          deferred.reject(Exception.FEATURE_NOT_IMPLEMENTED_EXCEPTION);
          break;
        default:
          deferred.reject(Exception.ACTIVITY_POST_CREATING_ERROR);
          break;
        }

      })
      .then(function (response) {
        deferred.resolve(response);
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  module.exports = {
    insertNewPost: insertNewPost
  };

}());
