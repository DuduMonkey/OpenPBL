var activityService = require('../Services/ActivityService')();

exports.get = function(req,res){
  res.send({activity: true});
}
