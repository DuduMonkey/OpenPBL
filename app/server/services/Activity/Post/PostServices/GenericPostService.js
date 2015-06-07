(function () {
  'use strict';

  var Post = require('../../../../models/Post');
  var Q = require('q');

  var insertPostData = function (postData) {
    var deferred = Q.defer();
    Post.saveNewPost(postData)
      .then(function () {
        deferred.resolve();
      })
      .catch(function (error) {
        deferred.reject(error);
      });
    return deferred.promise;
  };

  var deletePostData = function (postId) {
    var deferred = Q.defer();

    Post.removePost(postId)
      .then(function () {
        deferred.resolve("removido");
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  module.exports = {
    insertPostData: insertPostData,
    deletePostData: deletePostData
  };

}());
