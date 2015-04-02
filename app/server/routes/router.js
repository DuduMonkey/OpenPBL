//Services
var authentication = require('../services/authenticationService');

module.exports = function(app, path, router){
  // Default test route
  router.get('/', function(req, res) {
      res.json({
          success: true
      });
  });

  //Authentication
  router.route('/login')
    .post(authentication.login);

  router.route('/signup')
    .post(authentication.signup);

  router.route('/logout')
    .post(authentication.logout);


  app.use('/api', router); //Prefix every route with /api

  // Default '/' site route
  app.get('*', function(req, res) {
    res.sendFile(path.resolve('app/public/index.html'));
  });

    // Middleware for routes
  router.use(function(req, res, next) {
    next();
  })
}
