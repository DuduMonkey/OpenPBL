module.exports = function(router){

  router.use(function(req, res, next) {

    var url = req.url;
    var baseUrl = req.baseUrl;

    if(pathNeedsAuthentication(url,baseUrl)){

      res.status(401).send({message: 'faça login'});

    }else{

      next();

    };

  });
};

var pathNeedsAuthentication = function(url, baseUrl){
  var freeFromAuthenticationPaths = [
    '/signup',
    '/login'
  ];

  if(!baseUrl){
    return false;
  }else{
    var freeFromAuthentication = (freeFromAuthenticationPaths.indexOf(url) > -1);
    if(freeFromAuthentication){
      return false;
    }else{
      return true;
    }
  }

};
