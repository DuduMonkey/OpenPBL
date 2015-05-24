(function () {
  'use strict';

  //Modules in use
  var Activity = require('../../../models/Activity');
  var User = require('../../../models/User');
  var Message = require('../../../shared/MessageResource');
  var Exception = require('../../../shared/Exceptions');
  var Q = require('q');

  //Specifications in use
  var ActivitySpec = require('../Specification/ActivitySpec');

  /**
    Insert a (new)User on Activity
  **/
  var insertNewUser = function (activityId, userEmail) {
    var deferred = Q.defer();

    //Declare the container to selected user on database
    var userToInsert = null;

    User.getUserByEmail(userEmail)
      .then(function (user) {
        if (ActivitySpec.UserIsntNullOrUndefined().isSatisfiedBy(user)) {
          userToInsert = user;
          return Activity.queryInActivities({
            select: '-_id participants',
            where: ['_id'],
            conditions: [activityId],
            join: [
              {
                path: 'participants',
                match: { _id: user._id }
              }
            ]
          });
        }
        deferred.reject(Exception.ACTIVITY_USER_NOT_EXISTS);
        console.log(user);
      })
      .then(function (activities) {
        if (ActivitySpec.ActivityAlreadyHaveTheUser().isSatisfiedBy(activities[0])) {
          deferred.reject(Exception.ACTIVITY_USER_ALREADY_EXISTS);
        } else {
          var queryInsertUser = {
            $addToSet: { participants: userToInsert._id }
          };
          return Activity.updateActivity(activityId, queryInsertUser);
        }
      })
      .then(function () {
        deferred.resolve({ message: Message.SUCCESS_INSERTING_USER });
      })
      .catch(function () {
        deferred.reject(Exception.ACTIVITY_USER_INSERTING_ERROR);
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
      .catch(function () {
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
