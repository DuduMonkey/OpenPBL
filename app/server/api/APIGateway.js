/*global module, require*/
(function () {
  'use strict';

  // Import all the service facades
  var authentication = require('../rest/RESTAuthentication');
  var register = require('../rest/RESTRegister');
  var activity = require('../rest/RESTActivity');
  var activityUser = require('../rest/RESTActivityUser');
  var story = require('../rest/RESTStory');
  var fact = require('../rest/RESTFact');
  var hypothesis = require('../rest/RESTHypothesis');
  var resolution = require('../rest/RESTResolution');
  var roles = require('../rest/RESTRole');
  var research = require('../rest/RESTResearch');

  // Route mapper
  var _r = require('./RouteMapper');

  /**
    Global router
  */
  module.exports = function (app, path, router) {

    // Initialize the middleware proxy oversee
    require('./RouteInterceptor')(router);

    // Prefix every route api with API
    // Remember, all prefixed routes needs authentication
    app.use('/api', router);

    /*jslint unparam: true*/
    // Default html document (main site)
    app.get('*', function (req, res) {
      res.sendFile(path.resolve('app/public/index.html'));
    });

    // Default authentication test route
    router.get('/', function (req, res) {
      res.json({
        success: true
      });
    });
    /*jslint unparam: false*/

    // [GET] the role list
    router.route(_r.role)
      .get(roles.get);

    // [POST] Register new user on server
    router.route(_r.signup)
      .post(register.post);

    // [POST] User data to login on application
    router.route(_r.login)
      .post(authentication.post);

    // [POST] Activity data to create new activity
    // [GET] List of activities
    router.route(_r.activities)
      .post(activity.post)
      .get(activity.list);

    // [GET] Activity basic data from user  
    // [PUT] Update activity from user  
    // [DELETE] Activity from user  
    router.route(_r.activity)
      .get(activity.getActivityData)
      .put(activity.updateActivityStatus)
      .delete(activity.delete);

    // [GET] Story data from activity
    // [POST] Story data to save activity story
    router.route(_r.stories)
      .get(story.get)
      .post(story.post);

    // [POST] User on activity
    router.route(_r.participants)
      .post(activityUser.insertUser);

    // [DELETE] User from activity
    router.route(_r.participant)
      .delete(activityUser.removeUser);

    // [GET] Facts from activity  
    // [POST] Fact in activity
    router.route(_r.facts)
      .get(fact.list)
      .post(fact.post);

    // [DELETE] An Fact from activity
    router.route(_r.fact)
      .delete(fact.delete);

    // [GET] Hypothesis from activity  
    // [POST] Hypothesis in activity
    router.route(_r.hypotheses)
      .get(hypothesis.list)
      .post(hypothesis.post);

    // [DELETE] An Hypothesis from activity
    router.route(_r.hypothesis)
      .delete(hypothesis.delete);

    // [GET] Resolutions from activity  
    // [POST] Resolution in activity
    router.route(_r.resolutions)
      .get(resolution.list)
      .post(resolution.post);

    // [DELETE] An Resolution from activity
    router.route(_r.resolution)
      .delete(resolution.delete);

    // [GET] Activity Research list
    // [POST] Activity Research list
    router.route(_r.research)
      .get(research.get)
      .post(research.post);
  };
}());
