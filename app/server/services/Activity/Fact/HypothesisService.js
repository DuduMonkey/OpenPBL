(function () {
  'use strict';

  var Post = require('../../../models/Post');
  var TYPE = require('../../../models/constants/post_type');
  var Message = require('../../../shared/MessageResource');
  var Q = require('q');

  var createNewHypothesis = function (postData) {
    var deferred = Q.defer();
    postData.type = TYPE.HYPOTHESIS;

    Post.saveNewPost(postData)
      .then(function () {
        deferred.resolve({ message: Message.SUCCESS_INSERTING_HYPOTHESIS });
      })
      .catch(function (error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  module.exports = {
    createNewHypothesis: createNewHypothesis
  };

}());
