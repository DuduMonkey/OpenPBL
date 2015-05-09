(function () {
  'use strict';

  //Modules in use
  var Story = require('../models/Story');
  var Activity = require('../models/Activity');
  var activityState = require('../models/constants/activity_state');
  var Message = require('../shared/MessageResource');
  var Q = require('q');

  var persistedStoryResponseBag = function () {
    var responseBag = {};

    responseBag.message = Message.SUCCESS_SAVING_STORY;

    return responseBag;
  };

  /**
    Set an activity story and update the activity status
  **/
  var insertActivityStory = function (activityId, storyData) {
    var deferred = Q.defer();

    //new Story data
    var story = {
      activityId: activityId,
      description: storyData.description,
      helpfulMaterials: storyData.helpfulMaterials,
      externalLinks: storyData.externalLinks
    };

    Story.saveNewStory(story)
      .then(function (newStory) {
        return Activity.updateActivity(
          activityId,
          {
            story: newStory._id,
            status: activityState.GENERATING_FACTS
          }
        );
      })
      .then(function () {
        var responseBag = persistedStoryResponseBag();
        deferred.resolve(responseBag);
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  module.exports = {
    insertActivityStory: insertActivityStory
  };
}());
