/*global module, require*/
(function () {
  'use strict';

  // Services in use
  var authentication = require('../rest/RESTAuthentication');
  var register = require('../rest/RESTRegister');
  var activity = require('../rest/RESTActivity');
  var activityUser = require('../rest/RESTActivityUser');
  var story = require('../rest/RESTStory');
  var fact = require('../rest/RESTFact');
  var roles = require('../rest/RESTRole');

  /**
    Global router
  */
  module.exports = function (app, path, router) {

    // Initialize the middleware proxy oversee
    require('./APIProxy')(router);

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
    router.route('/role')
      .get(roles.get);

    // [POST] New user data to create user
    router.route('/signup')
      .post(register.post);

    // [POST] User data to login on application
    router.route('/login')
      .post(authentication.post);

    // [POST] Activity data to create new activity
    // [GET] List of activities
    router.route('/activity')
      .post(activity.post)
      .get(activity.list);

    // [GET] Activity basic data from user  
    // [PUT] Update activity from user  
    // [DELETE] Activity from user  
    router.route('/activity/:id')
      .get(activity.getActivityData)
      .put(activity.updateActivityStatus)
      .delete(activity.delete);

    // [GET] Story data from activity
    // [POST] Story data to save activity story
    router.route('/activity/:id/story')
      .get(story.get)
      .post(story.post);

    // [POST] User on activity
    router.route('/activity/:id/participant')
      .post(activityUser.insertUser);

    // [DELETE] User from activity
    router.route('/activity/:activityId/participant/:userId')
      .delete(activityUser.removeUser);

    // [POST] Fact in activity
    router.route('/activity/:id/fact')
      .post(fact.post);
  };
}());
