(function () {
  'use strict';

  var Routes = {};

  var defineStatusProperty = function (Key, Value) {
    Object.defineProperty(Routes, Key, {
      value: Value,
      writable: false,
      enumerable: true,
      configurable: false
    });
  };

  defineStatusProperty('default_rote','/');
  defineStatusProperty('api', '/api');
  defineStatusProperty('role', '/role');
  defineStatusProperty('signup', '/signup');
  defineStatusProperty('login', '/login');
  defineStatusProperty('activities', '/activity');
  defineStatusProperty('activity', '/activity/:id');
  defineStatusProperty('stories', '/activity/:id/story');
  defineStatusProperty('participants', '/activity/:id/participant');
  defineStatusProperty('participant', '/activity/:activityId/participant/:userId');
  defineStatusProperty('facts', '/activity/:id/fact');
  defineStatusProperty('fact', '/activity/:activityId/fact/:id');
  defineStatusProperty('hypotheses', '/activity/:id/hypothesis');
  defineStatusProperty('hypothesis', '/activity/:activityId/hypothesis/:id');
  defineStatusProperty('resolutions', '/activity/:id/resolution');
  defineStatusProperty('resolution', '/activity/:activityId/resolution/:id');

  module.exports = Routes;
}());
