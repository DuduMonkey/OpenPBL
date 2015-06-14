(function () {
  'use strict';

  var Post = require('../../../../models/Post');
  var Message = require('../../../../shared/MessageResource');
  var Activity = require('../../../../models/Activity');
  var Q = require('q');

  function PostBaseService() {
  }

  PostBaseService.prototype.savePostOnDatabase = function (postData, successResponse) {
    var deferred = Q.defer();

    Post.saveNewPost(postData)
      .then(function (post) {
        var queryInsertPost = {
          $addToSet: { posts: post._id }
        };
        return Activity.updateActivity(post._activity, queryInsertPost);
      })
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

  var createResponseBagFrom = function (posts) {
    var responseBag = [];

    posts.forEach(function (post) {
      var postBag = {
        id: post._id,
        creator: post._creator.name,
        content: post.content,
        date: post.date
      };

      responseBag.push(postBag);
    });

    return responseBag;
  };

  PostBaseService.prototype.listPostsFromActivity = function (activityId, typeOfPost) {
    var deferred = Q.defer();

    var querySelectPosts = {
      select: '_id _creator content date',
      where: ['_activity', 'type'],
      conditions: [activityId, typeOfPost],
      join: [
        {
          path: '_creator',
          select: '-_id name '
        }
      ]
    };

    Post.queryInPosts(querySelectPosts)
      .then(function (posts) {
        var postBagList = createResponseBagFrom(posts);
        deferred.resolve(postBagList);
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  module.exports = PostBaseService;
}());
