/*global module*/
(function () {
  'use strict';

  var STATUS = {};

  var defineStatusProperty = function (Key, Value) {
      Object.defineProperty(STATUS, Key, {
          value: Value,
          writable: false,
          enumerable: true,
          configurable: false
      });
  };

  /**
    Enumerable activity status
    1 = Creating story for the activity
    2 = Generation facts for the activity story
    3 = Identifying hipotesys for the activity story
    4 = Researching knowledge on disabled knowledge
    5 = Solving the problem defined on story
    6 = Abstracting the results of problem solving
    7 = Finishing the activity
  */
  defineStatusProperty('CREATING_STORY',1);
  defineStatusProperty('GENERATING_FACTS',2);
  defineStatusProperty('IDENTIFYING_HIPOTESYS',3);
  defineStatusProperty('RESEARCHING',4);
  defineStatusProperty('RESOLVING_PROBLEM',5);
  defineStatusProperty('ABSTRACTING',6);
  defineStatusProperty('FINISHED',7);

  STATUS.getStatusAfter = function (thisStatus) {
    var statusValueList = Object.keys(STATUS).map(function (key) { return STATUS[key]; } );   
    var nextIndex = statusValueList.indexOf(thisStatus);
    nextIndex ++;

    var nextStatusValue = statusValueList[nextIndex];

    var getStatusKey = function (thisValue) {

      for (var key in STATUS) {
          if(STATUS[key] === thisValue ) {
              return key;
          }
      }
    };

    var nextStatusKey = getStatusKey(nextStatusValue);

    return STATUS[nextStatusKey];
  };

  module.exports = STATUS;
}());
