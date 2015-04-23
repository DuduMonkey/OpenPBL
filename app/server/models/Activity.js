/*global module, require*/
(function () {
  'use strict';

  // Modules in use
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var Q = require('q');
  var Exception = require('../shared/Exceptions');

  var ActivitySchema = new Schema({
    _creator: { type: String, ref: 'User' },
    name: { type: String, required: true},
    story: String,
    status: {type: Number, min: 1, max: 7, default: 1},
    created: {type: Date, default: Date.now},
    participants: [{ type: Number, ref: 'User'}]
  });

  ActivitySchema.statics.saveNewActivity = function (activityData) {
    var deferred = Q.defer();

    var newActivity = new this({
      _creator: activityData.creatorId,
      name: activityData.name,
      participants: activityData.participants
    });

    newActivity.save(function (err, activity) {
      if (err) {
        deferred.reject(Exception.ERROR_CREATING_NEW_ACTIVITY);
      }
      deferred.resolve(activity);
    });
    return deferred.promise;
  };

  module.exports = mongoose.model('Activity', ActivitySchema);
}());
