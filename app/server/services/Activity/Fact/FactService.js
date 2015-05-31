(function () {
  'use strict';

  var Post = require('../../../models/Post');
  var TYPE = require('../../../models/constants/post_type');
  var Message = require('../../../shared/MessageResource');
  var Q = require('q');

  var createNewFact = function (postData) {
    var deferred = Q.defer();
    postData.type = TYPE.FACT;

    Post.saveNewPost(postData)
      .then(function () {
        deferred.resolve({ message: Message.SUCCESS_INSERTING_FACT });
      })
      .catch(function (error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  module.exports = {
    createNewFact: createNewFact
  };

}());
