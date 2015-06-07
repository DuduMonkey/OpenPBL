(function () {
  'use strict';

  var GenericPostService = require('./GenericPostService');
  var TYPE = require('../../../../models/constants/post_type');
  var Message = require('../../../../shared/MessageResource');
  var Q = require('q');

  var HypothesisService = function () {

    this.savePostOnDatabase = function (postData) {
      var deferred = Q.defer();
      postData.type = TYPE.HYPOTHESIS;

      GenericPostService.insertPostData(postData)
        .then(function () {
          deferred.resolve({ message: Message.SUCCESS_INSERTING_HYPOTHESIS });
        })
        .catch(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    };

  };


  module.exports = HypothesisService;
}());
