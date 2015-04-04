//Services
var authentication = require('../REST/RESTAuthentication');
var activity = require('../REST/RESTActivity');
var register = require('../REST/RESTRegister');

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

  app.use('/api', router); //Prefix every route with /api

  // Default '/' site route
  app.get('*', function(req, res) {
    res.sendFile(path.resolve('app/public/index.html'));
  });
}
