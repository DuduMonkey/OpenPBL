var activityService = require('../services/ActivityService')();

exports.get = function(req,res){
  res.send({activity: true});
}
