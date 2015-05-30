(function () {
  'use strict';

  //Modules in use
  var Story = require('../../../models/Story');
  var Activity = require('../../../models/Activity');
  var activityState = require('../../../models/constants/activity_state');
  var Message = require('../../../shared/MessageResource');
  var Q = require('q');

  //Specifications in use
  var ActivitySpec = require('../Specification/ActivitySpec');

  var updateActivityStory = function (activityId, storyViewData, storyId) {
    var deferred = Q.defer();

    var queryUpdateStory = {
      $set: { 
        description: storyViewData.description,
        helpfulMaterials: storyViewData.helpfulMaterials,
      }
    };

    Story.updateStory(storyId, queryUpdateStory)
      .then(function (story) {
        deferred.resolve(story);
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  }

  var saveActivityStory = function (activityId, storyViewData) {
    var deferred = Q.defer();

    //new Story data
    var storyData = {
      activityId: activityId,
      description: storyViewData.description,
      helpfulMaterials: storyViewData.helpfulMaterials,
      externalLinks: storyViewData.externalLinks
    };

    Story.saveNewStory(story)
      .then(function (newStory) {
        return Activity.updateActivity(
          activityId,
          {
            story: newStory._id 
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
  }

    /**
    Set an activity story and update the activity status
  **/
  var insertActivityStory = function (activityId, storyViewData) {
    var deferred = Q.defer();

    Activity.queryInActivities({
            select: '-_id story',
            where: ['_id'],
            conditions: [activityId],
            join: [
              {
                path: 'story',
                select: '_id'
              }
            ]
      })
      .then(function (activities) {
        var selectedActivity = activities[0];
        if (ActivitySpec.ActivityHasStory().isSatisfiedBy(selectedActivity)) {
          return updateActivityStory(activityId, storyViewData, selectedActivity.story._id);
        }
        console.log('nao tem problema');
      })
      .then(function (story) {
        console.log(story);
        deferred.resolve({ message: Message.SUCCESS_SAVING_STORY });
      })
      .catch(function (error) {
        deferred.reject(error);
      })

    return deferred.promise;
  };

  module.exports = {
    insertActivityStory: insertActivityStory
  };
}());
