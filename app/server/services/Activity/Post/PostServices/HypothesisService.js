(function () {
  'use strict';

  var PostBaseService = require('./PostBaseService');
  var TYPE = require('../../../../models/constants/post_type');
  var Message = require('../../../../shared/MessageResource');

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

  module.exports = HypothesisService;
}());
