(function () {
  'use strict';

  //Modules in use
  var Story = require('../../../models/Story');
  var Activity = require('../../../models/Activity');
  var Message = require('../../../shared/MessageResource');
  var Q = require('q');

  //Specifications in use
  var ActivitySpec = require('../Specification/ActivitySpec');

  /**
    Update an activity story based on story data received and story uid
  **/
  var updateActivityStory = function (storyViewData, storyId) {
    var deferred = Q.defer();

    var queryUpdateStory = {
      $set: {
        description: storyViewData.description,
        helpfulMaterials: storyViewData.helpfulMaterials,
        externalLinks: storyViewData.externalLinks
      }
    };

    Story.updateStory(storyId, queryUpdateStory)
      .then(function () {
        deferred.resolve();
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  /**
    Save an activity story on activity received
  **/
  var saveActivityStory = function (activityId, storyViewData) {
    var deferred = Q.defer();

    var storyData = {
      activityId: activityId,
      description: storyViewData.description,
      helpfulMaterials: storyViewData.helpfulMaterials,
      externalLinks: storyViewData.externalLinks
    };

    Story.saveNewStory(storyData)
      .then(function (newStory) {
        return Activity.updateActivity(
          activityId,
          {
            story: newStory._id
          }
        );
      })
      .then(function () {
        deferred.resolve();
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  /**
    Insert activity story using strategy to find if is update or insert
  **/
  var insertActivityStory = function (activityId, storyViewData) {
    var deferred = Q.defer();

    var queryFindActivity = {
      select: '-_id story',
      where: ['_id'],
      conditions: [activityId],
      join: [
        {
          path: 'story',
          select: '_id'
        }
      ]
    };

    Activity.queryInActivities(queryFindActivity)
      .then(function (activities) {
        var selectedActivity = activities[0];
        if (ActivitySpec.ActivityHasStory().isSatisfiedBy(selectedActivity)) {
          return updateActivityStory(activityId, storyViewData, selectedActivity.story._id);
        }
        return saveActivityStory(activityId, storyViewData);
      })
      .then(function () {
        deferred.resolve({ message: Message.SUCCESS_SAVING_STORY });
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
