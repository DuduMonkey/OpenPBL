/*global  exports*/
(function () {
  'use strict';

  exports.UserIsntNullOrUndefined = function () {

    var isSatisfiedBy = function (user) {
      if (user !== null && typeof user !== 'undefined') {
        return true;
      }
      return false;
    };

    return {
      isSatisfiedBy: isSatisfiedBy
    };
  };

  exports.ActivityHasThisUser = function () {

    var isSatisfiedBy = function (activity) {
      if (activity.participants.length !== 0) {
        return true;
      }
      return false;
    };

    return {
      isSatisfiedBy: isSatisfiedBy
    };
  };

  exports.HasFoundExactlyOneActivity = function () {

    var isSatisfiedBy = function (activities) {
      if (activities.length === 1) {
        return true;
      }
      return false;
    };

    return {
      isSatisfiedBy: isSatisfiedBy
    };
  };

  exports.ActivityHasStory = function () {

    var isSatisfiedBy = function (activity) {
      if (!!activity.story) {
        return true;
      }
      return false;
    };

    return {
      isSatisfiedBy: isSatisfiedBy
    };
  };

}());
