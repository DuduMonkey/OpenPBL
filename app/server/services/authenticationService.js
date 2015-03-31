require('./configuration/passport')(passport); 

exports.login = function(req, res){
  res.send({logged: true});
}

exports.signup = function(req, res){
  res.send({registered: true});
}

exports.logout = function(req, res){
  res.send({loggedout: true});
}

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/');
  }
}
