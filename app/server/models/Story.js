/*global module, require*/
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
    _activity: { type: String, ref: 'User' },
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
      helpfulMaterials: storyData.helpfulMaterials,
      externalLinks: storyData.externalLinks
    });

    newStory.save(function (err, story) {
      if (!!err) {
        deferred.reject(Exception.ACTIVITY_INSERTING_STORY_ERROR);
      }
      deferred.resolve(story);
    });

    return deferred.promise;
  };

  module.exports = mongoose.model('Story', StorySchema);
}());
