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

  exports.ActivityAlreadyHaveTheUser = function () {

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
}());
