/*global module, require*/
(function () {
  'use strict';

  // Modules in use
  var Exception = require('../shared/Exceptions');
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var Q = require('q');


  /**
    Defines the mongo post schema
      _activity: Activity related with the post
      Name: String required
      Role: Number, accepts only 1 and 2
      Email: String required and unique,
      Password: String required
  */
  var PostSchema = new Schema({
    _activity: { type: String, ref: 'User' },
    _creator: { type: String, ref: 'User' },
    content: { type: String, required: true},
    type: { Type: Number, min: 1, max: 1 },
    date: {type: Date, default: Date.now }
  });


  /** 
    Schema method to persist new user document on database 
  **/
  PostSchema.statics.saveNewPost = function (postData) {
    var deferred = Q.defer();

    var newPost = new this({
      _activity: postData.activityId,
      _creator: postData.userId,
      content: postData.content,
      type: postData.type
    });

    newPost.save(function (err, data) {
      if (err) { 
        deferred.reject(Exception.ACTIVITY_POST_INSERT_ERROR); 
      }
      deferred.resolve(data);
    });

    return deferred.promise;
  };

  /**
    Given the parameters remove an Post
  **/
  PostSchema.statics.removePost = function (postId) {
    var deferred = Q.defer();

    this.findByIdAndRemove(postId, function (err, post) {
      if (!!err) {
        deferred.reject(Exception.ACTIVITY_POST_DELETE_ERROR);
      } else if (post === GLOBAL.CONST_NULL_OBJECT) {
        deferred.reject(Exception.ACTIVITY_POST_INVALID_TO_DELETE);
      }
      deferred.resolve();
    });

    return deferred.promise;
  };

  

  module.exports = mongoose.model('Post', PostSchema);
}());
