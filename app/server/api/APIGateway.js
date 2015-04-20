/*global module, require*/
(function () {
  'use strict';

  // Services in use
  var authentication = require('../rest/RESTAuthentication');
  var register = require('../rest/RESTRegister');
  var activity = require('../rest/RESTActivity');

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

    // User Register route (RESTRegister)
    router.route('/signup')
      .post(register.post);

    // User Authentication route (RESTAuthentication)
    router.route('/login')
      .post(authentication.post);
      
    router.route('/dashboard/activity')
      .post(activity.post);
  };
}());
