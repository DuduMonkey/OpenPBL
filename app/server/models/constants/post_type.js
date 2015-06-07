/*global module*/
(function () {
  'use strict';

  var POST_TYPE = {};

  var defineStatusProperty = function (Key, Value) {
    Object.defineProperty(POST_TYPE, Key, {
      value: Value,
      writable: false,
      enumerable: true,
      configurable: false
    });
  };

  /**
    Enumerable post type
    1 = The post is an fact
    2 = The post is an hypothesis
    3 = The post is an resolution
  */
  defineStatusProperty('FACT', 1);
  defineStatusProperty('HYPOTHESIS', 2);
  defineStatusProperty('RESOLUTION', 3);

  module.exports = POST_TYPE;
}());
