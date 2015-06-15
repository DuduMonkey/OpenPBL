/*global module, require, GLOBAL*/
(function () {
  'use strict';

  // Modules in use
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var Q = require('q');
  var Exception = require('../shared/Exceptions');

  /**
    Defines the mongo story schema
      _activity: Activity whom story pertences
      description: String, story description
      helpfulMaterial: String [], of Books, Papers etc...
      externalLinks: String [] of helpful Urls
  */
  var StorySchema = new Schema({
    _activity: { type: String, ref: 'Activity' },
    description: { type: String, required: true},
    helpfulMaterials: [{ type: String, required: true }],
    externalLinks: [{type: String, required: true }]
  });

  /**
    Save an new instance of story model on database
    The received data needs to be on format:
      {
        activityId: String                                  =>   Represents the activity of story
        description: String                                 =>   Represents the description of story
        helpfulMaterials: ["Content","Content","Content"]   =>   Represents the list of Helpful Books etc..
        externalLinks: ["link.com","link.com","link.com"]   =>   Represents the list of Helpful Links etc...''
      }
  **/
  StorySchema.statics.saveNewStory = function (storyData) {
    var deferred = Q.defer();

    var newStory = new this({
      _activity: storyData.activityId,
      description: storyData.description,
      helpfulMaterials: storyData.helpfulMaterials || GLOBAL.CONST_EMPTY_LIST,
      externalLinks: storyData.externalLinks || GLOBAL.CONST_EMPTY_LIST
    });

    newStory.save(function (err, story) {
      if (!!err) {
        deferred.reject(Exception.ACTIVITY_STORY_INSERTING_ERROR);
      }
      deferred.resolve(story);
    });

    return deferred.promise;
  };

  /**
    Update an story document by Id

    updatedAttrs => attributes to be update

    updatedAttrs format: (i.e: using $set attribute form mongoDB)
    {  
      $set: { 
            description: 'Description',
            helpfulMaterials: 'Helpful no?',
      }
    }
  **/
  StorySchema.statics.updateStory = function (storyId, updatedAttrs) {
    var deferred = Q.defer();

    this.findByIdAndUpdate(storyId, updatedAttrs, function (err, story) {
      if (!!err) {
        deferred.reject(Exception.ACTIVITY_STORY_UPDATE_ERROR);
      }
      deferred.resolve(story);
    });

    return deferred.promise;
  };

  module.exports = mongoose.model('Story', StorySchema);
}());
