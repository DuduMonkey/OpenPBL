(function () {
  'use strict';

  var PostBaseService = require('./PostBaseService');
  var TYPE = require('../../../../models/constants/post_type');
  var Message = require('../../../../shared/MessageResource');
  var Q = require('q');

  var HypothesisService = function () {
    this.ServiceType = TYPE.HYPOTHESIS;
  };

  HypothesisService.prototype = new PostBaseService();

  HypothesisService.prototype.savePostOnDatabase = function (postData) {
    postData.type = this.ServiceType;

    var successResponse = {
      message: Message.SUCCESS_INSERTING_HYPOTHESIS
    };

    return PostBaseService.prototype.savePostOnDatabase.call(this, postData, successResponse);
  };

  HypothesisService.prototype.listPostsFromActivity = function (activityId) {
    var deferred = Q.defer();

    PostBaseService.prototype.listPostsFromActivity.call(this, activityId, this.ServiceType)
      .then(function (postBagList) {
        deferred.resolve({ hypothesis: postBagList });
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  module.exports = HypothesisService;
}());
