(function () {
  'use strict';

  var PostBaseService = require('./PostBaseService');
  var TYPE = require('../../../../models/constants/post_type');
  var Message = require('../../../../shared/MessageResource');
  var Q = require('q');

  var FactService = function () {
    this.ServiceType = TYPE.FACT;
  };

  FactService.prototype = new PostBaseService();

  FactService.prototype.savePostOnDatabase = function (postData) {
    postData.type = this.ServiceType;

    var successResponse = {
      message: Message.SUCCESS_INSERTING_FACT
    };

    return PostBaseService.prototype.savePostOnDatabase.call(this, postData, successResponse);
  };

  FactService.prototype.listPostsFromActivity = function (activityId) {
    var deferred = Q.defer();

    PostBaseService.prototype.listPostsFromActivity.call(this, activityId, this.ServiceType)
      .then(function (postBagList) {
        deferred.resolve({ facts: postBagList });
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  module.exports = FactService;
}());
