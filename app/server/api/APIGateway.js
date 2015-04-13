//Services
var authentication = require('../rest/RESTAuthentication');
var activity = require('../rest/RESTActivity');
var register = require('../rest/RESTRegister');

module.exports = function(app, path, router){

  //middleware
  require('./APIProxy')(router);

  // Default test route
  router.get('/', function(req, res) {
    res.json({
      success: true
    });
  });

  //Register
  router.route('/signup')
    .post(register.post);

  router.route('/login')
    .post(authentication.post);

  app.use('/api', router); //Prefix every route with /api

  // Default '/' site route
  app.get('*', function(req, res) {
    res.sendFile(path.resolve('app/public/index.html'));
  });
}
