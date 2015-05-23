(function () {
  'use strict';

  //Modules in use
  var Activity = require('../../../models/Activity');
  var User = require('../../../models/User');
  var Message = require('../../../shared/MessageResource');
  var Exception = require('../../../shared/Exceptions');
  var userService = require('../../User/UserService');
  var Q = require('q');

  /**
    Insert a (new)User on Activity
  **/
  var insertNewUser = function (activityId, userEmail) {
    var deferred = Q.defer();

    var activitySizeBeforeUpdate = GLOBAL.CONST_EMPTY_NUMBER;
    var queryActivityParticipants = {
          select: '-_id participants',
          where: ['_id'],
          conditions: [activityId]
    }

    Activity.queryInActivities(queryActivityParticipants)
      .then(function (activities) {
        activitySizeBeforeUpdate = activities[0].participants.length;
        return User.getUserByEmail(userEmail);
      })  
      .then(function (user) {
        if (user !== null) {
          var updateQuery = {
            $addToSet: { participants: user._id }
          };
          return Activity.updateActivity(activityId, updateQuery);
        } else {
          return userService.inviteUserToApplication(userEmail, activityId);
        }
      })
      .then(function (activity) {
        if (activity.participants.length > activitySizeBeforeUpdate) {
          deferred.resolve({ message: Message.SUCCESS_INSERTING_USER });
        } else {
          deferred.reject(Exception.ERROR_ACTIVITY_USER_INSERT);
        }
      })
      .catch(function () {
        deferred.reject(Exception.USER_INSERTING_ERROR);
      });

    return deferred.promise;
  };

  /**
    Delete an user from activity
  **/
  var removeUser = function (activityId, userId) {
    var deferred = Q.defer();

    var updateQuery = {
      $pull: { participants: userId }
    };

    Activity.updateActivity(activityId, updateQuery)
      .then(function () {
        deferred.resolve({ message: Message.SUCCESS_REMOVING_USER });
      })
      .catch(function (error) {
        deferred.reject(Exception.USER_DELETING_ERROR);
      });
    return deferred.promise;
  };

  //export singleton class
  module.exports = {
    insertNewUser: insertNewUser,
    removeUser: removeUser,
  };
}());
