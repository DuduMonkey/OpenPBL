(function () {
  'use strict';

  var PostBaseService = require('./PostBaseService');
  var TYPE = require('../../../../models/constants/post_type');
  var Message = require('../../../../shared/MessageResource');

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

  module.exports = ResolutionService;
}());
