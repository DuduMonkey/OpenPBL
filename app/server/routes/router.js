//LOGGER
var finalhandler = require('finalhandler')
var morgan = require('morgan');
var logger = morgan('combined');

//Services
var authentication = require('../services/authenticationService');


module.exports = function(app, passport, path, router){
  // Default test route
  router.get('/', function(req, res) {
      res.json({
          success: true
      });
  });

  app.use('/api', router); //Prefix every route with /api

  // Default '/' site route
  app.get('*', function(req, res) {
    res.sendFile(path.resolve('app/public/index.html'));
  });

    // Middleware for routes
  router.use(function(req, res, next) {

    //LOGGER
    var done = finalhandler(req,res);
    logger(req, res, function(err){
      if(err) return done(err);
    });

    next();
  })
}
