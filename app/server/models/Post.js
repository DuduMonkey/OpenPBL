/*global module, require, GLOBAL*/
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
    type: { type: Number, min: 1, max: 3, required: true },
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

  /**
    Find all posts by comparisson between an passed column and an condition
      whereColumn      =>  column to compare on where condition
      where Condition  =>  a single value (equals condition) or a list (In condition)
      Query Configuration need to be like the object below:
      i.e:
      {
        select: ['_id content _creator date'],
        where: ['_activity', 'type'],
        conditions: [ActivityId], [1]],
        join: [
                {
                  path: '_creator',
                  select: '-_id name '
                }
              ]
      }

      the query result will select _id, content, _creator and date from all instances 
      where _activity is equals ActivityId and type is in [1], 
      the result will be populated with the creator name without id
  **/
  PostSchema.statics.queryInPosts = function (queryAttr) {
    var deferred = Q.defer()
    , query = this.find();

    if (!!queryAttr.select) {
      query.select(queryAttr.select);
    }

    if (!!queryAttr.where && !!queryAttr.where.length) {
      queryAttr.where.forEach(function (column, index) {
        query.where(column).equals(queryAttr.conditions[index]);
      });
    }

    if (!!queryAttr.join && !!queryAttr.join.length) {
      queryAttr.join.forEach(function (documentAttr) {
        query.populate(documentAttr);
      });
    }

    query.exec(function (err, posts) {
      if (!!err) {
        deferred.reject(Exception.ACTIVITY_POST_QUERY_ERROR);
      }
      deferred.resolve(posts);
    });

    return deferred.promise;
  };

  module.exports = mongoose.model('Post', PostSchema);
}());
