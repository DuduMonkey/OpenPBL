(function () {
  'use strict';

  var PostBaseService = require('./PostBaseService');
  var TYPE = require('../../../../models/constants/post_type');
  var Message = require('../../../../shared/MessageResource');
  var Q = require('q');

  var ResolutionService = function () {
    this.ServiceType = TYPE.RESOLUTION;
  };

  ResolutionService.prototype = new PostBaseService();

  ResolutionService.prototype.savePostOnDatabase = function (postData) {
    postData.type = this.ServiceType;

    var successResponse = {
      message: Message.SUCCESS_INSERTING_HYPOTHESIS
    };

    return PostBaseService.prototype.savePostOnDatabase.call(this, postData, successResponse);
  };

  ResolutionService.prototype.listPostsFromActivity = function (activityId) {
    var deferred = Q.defer();

    PostBaseService.prototype.listPostsFromActivity.call(this, activityId, this.ServiceType)
      .then(function (postBagList) {
        deferred.resolve({ resolution: postBagList });
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  module.exports = ResolutionService;
}());
