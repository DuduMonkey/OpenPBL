/*global require, module, GLOBAL*/
(function () {
  'use strict';

  //Modules in use
  var Activity = require('../../models/Activity');
  var User = require('../../models/User');
  var Message = require('../../shared/MessageResource');
  var Exception = require('../../shared/Exceptions');
  var userService = require('../User/UserService');
  var Q = require('q');

  /**
    Transforms the new activity data into an response bag 
    with activity id and
  **/
  var newActivityResponseBag = function (activityData) {
    var responseBag = {};

    responseBag.id = activityData._id;
    responseBag.message = Message.SUCCESS_CREATING_ACTIVITY;

    return responseBag;
  };

  /**
    Transform a list of activities into an response bag
  **/
  var activityListResponseBag = function (activities) {
    var _responseBag = {
      activities: []
    };

    function getUserListSmallBag(userList) {
      var _listBag = [];

      userList.forEach(function (user) {
        var userBag = {
          name: user.name,
          numberOfPosts: !!user.posts ? user.posts.length : GLOBAL.CONST_EMPTY_NUMBER
        };
        _listBag.push(userBag);
      });

      return _listBag;
    }

    activities.forEach(function (activity) {
      var activityBag = {
        id: activity._id,
        name: activity.name,
        summary: !!activity.story ? activity.story.description : GLOBAL.CONST_EMPTY_STRING,
        status: activity.status,
        created: activity.created,
        participants: getUserListSmallBag(activity.participants)
      };

      _responseBag.activities.push(activityBag);
    });

    return _responseBag;
  };

  /** 
    Mount and persists the new Activity, 
    link the activity with the creator
    get all users from participants (email list)
    send registration emails for non-registered users
    Make the promise chain to create the new activity
  **/
  var createNewActivity = function (token, activityData) {
    var deferred = Q.defer();

    var activity = {
      name: activityData.name,
      creatorId: '',
      participants: []
    };

    userService.getSessionUser(token)
      .then(function (sessionUser) {
        activity.creatorId = sessionUser._id;
        return userService.getUsersFromEmailList(activityData.participants);
      })
      .then(function (users) {
        return userService.getAttributeFromUserList('_id', users);
      })
      .then(function (usersIds) {
        activity.participants = usersIds;
        return Activity.saveNewActivity(activity);
      })
      .then(function (newActivity) {
        var responseBag = newActivityResponseBag(newActivity);
        deferred.resolve(responseBag);
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  /**
    Get teacher Activities
  **/
  var getTeacherActivities = function (token) {
    var deferred = Q.defer();

    userService.getSessionUser(token)
      .then(function (sessionUser) {
        //find all activities from user and populate participants
        return Activity.findAllActivities({
          select: '_id name story created participants status',
          where: ['_creator'],
          conditions: [sessionUser._id],
          join: [
            {
              path: 'participants',
              select: '-_id name'
            },
            {
              path: 'story',
              select: '-_id description'
            }
          ]
        });
      })
      .then(function (activities) {
        var responseBag = activityListResponseBag(activities);
        deferred.resolve(responseBag);
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  /**
    Delete an user activity by id
  **/
  var deleteActivity = function (activityId) {
    var deferred = Q.defer();

    Activity.removeActivity(activityId)
      .then(function () {
        deferred.resolve();
      })
      .catch(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

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

    Activity.findAllActivities(queryActivityParticipants)
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

  // export the class
  module.exports = {
    createNewActivity: createNewActivity,
    getTeacherActivities : getTeacherActivities,
    deleteActivity: deleteActivity,
    insertNewUser: insertNewUser,
    removeUser: removeUser
  };
}());
