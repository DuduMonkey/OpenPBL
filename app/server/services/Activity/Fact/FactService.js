(function () {
  'use strict';

  var Message = require('../../../shared/MessageResource');
  var Post = require('../../../models/Post');
  var userService = require('../../User/UserService');
  var TYPE = require('../../../models/constants/post_type');
  var Q = require('q');

  var createNewFact = function (postData) {
    var deferred = Q.defer();
    postData.type = TYPE.FACT;

    Post.saveNewPost(postData)
      .then(function (post) {
        deferred.resolve({ message: 'Fato inserido com sucesso' });
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
