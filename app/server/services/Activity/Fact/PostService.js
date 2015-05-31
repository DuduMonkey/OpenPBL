(function () {
  'use strict';

  var Message = require('../../../shared/MessageResource');
  var Post = require('../../../models/Post');
  var userService = require('../../User/UserService');
  var TYPE = require('../../../models/constants/post_type');
  var Q = require('q');

  var createNewPost = function (token, activityId, postViewData, postType) {
    var deferred = Q.defer();

    userService.getSessionUser(token)
      .then(function (user) {

        var postData = {
          activityId: activityId,
          userId: user._id,
          content: postViewData.content
        };
        console.log(Post.postNew());
        switch (postType) {
        case TYPE.FACT:
          return Post.postNew().fact(postData);
        case TYPE.HIPOTESYS:
          return Post.postNew().hipotesys(postData);
        case TYPE.RESOLUTION:
          return Post.postNew().resolution(postData);
        }
      })
      .then(function (post) {
        deferred.resolve({ message: 'Inserido com sucesso' });
      })
      .catch(function (error) {
        deferred.reject(error);
      })


    return deferred.promise;
  };
  
  module.exports = {
    createNewPost: createNewPost
  };

}());
