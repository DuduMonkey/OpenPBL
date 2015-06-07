/*global module*/
(function () {
  'use strict';

  var Post = require('../../../../models/Post');
  var Message = require('../../../../shared/MessageResource');
  var Q = require('q');

  function PostBaseService() {}

  PostBaseService.prototype.savePostOnDatabase = function (postData, successResponse) {
    var deferred = Q.defer();

    Post.saveNewPost(postData)
      .then(function () {
        deferred.resolve(successResponse);
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  PostBaseService.prototype.deletePostOnDatabase = function (postId) {
    var deferred = Q.defer();
    Post.removePost(postId)
      .then(function () {
        deferred.resolve({ message: Message.SUCCESS_REMOVING_POST });
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  module.exports = PostBaseService;
}());
