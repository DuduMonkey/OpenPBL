var registerService = new (require('../Services/RegisterService'))(); //Initialize and run


exports.post = function(req,res){

  var responseData = function(error,data){
    if(data){
      res.send({
        email : data.local.email,
        success: true
      });
    }else{
      res.send({
        email: data.email,
        success: false,
        reason : error
      });
    }
  }

  registerService.registerUser(req.body,responseData);

}
