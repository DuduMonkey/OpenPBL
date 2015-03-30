//LOGGER
var finalhandler = require('finalhandler')
var morgan = require('morgan');
var logger = morgan('combined');

http.createServer(function(req,res){
  var done = finalhandler(req,res);
  logger(req, res, function(err){
    if(err) return done(err);

    res.setHeader('content-type', 'text/plain');
    res.end('LOG')
  });
});

module.exports = function(app, passport, path, router){

  // Middleware for routes
  router.use(function(req, res, next) {
      next();
  })

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

  app.get('/login');

}

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
}
