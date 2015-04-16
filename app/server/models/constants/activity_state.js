/*global module*/
'use strict';

/**
  Constant list
  1 = Creating story for the activity
  2 = Generation facts for the activity story
  3 = Identifying hipotesys for the activity story
  4 = Researching knowledge on disabled knowledge
  5 = Solving the problem defined on story
  6 = Abstracting the results of problem solving
  7 = Finishing the activity
*/
var __CREATING_STORY = 1;
var __GENERATING_FACTS = 2;
var __IDENTIFYING_HIPOTESYS = 3;
var __RESEARCHING = 4;
var __RESOLVING_PROBLEM = 5;
var __ABSTRACTING = 6;
var __FINISHED = 7;

module.exports = {
  CREATING_STORY : __CREATING_STORY,
  GENERATING_FACTS : __GENERATING_FACTS,
  IDENTIFYING_HIPOTESYS : __IDENTIFYING_HIPOTESYS,
  RESEARCHING : __RESEARCHING,
  RESOLVING_PROBLEM : __RESOLVING_PROBLEM,
  ABSTRACTING : __ABSTRACTING,
  FINISHED: __FINISHED
};
