(function () {
  'use strict';

  var STATUS = require('../../models/constants/activity_status');
  var Activity = require('../../models/Activity');
  var Exception = require('../../shared/Exceptions');
  var Q = require('q');

  var updateActivityStatus = function (activityId, currentStatus) {
    var deferred = Q.defer();

    if (currentStatus.status === STATUS.FINISHED) {
      deferred.reject(Exception.ACTIVITY_STATUS_IS_FINISHED);
    }

    var activityNextStatus = STATUS.getStatusAfter(currentStatus.status);

    var queryUpdateStatus = {
      $set: { status: activityNextStatus}
    };

    Activity.updateActivity(activityId, queryUpdateStatus)
      .then(function (activity) {
        console.log(activity);
        deferred.resolve({ message: 'Atividade atualizada com sucesso' });
      })
      .catch(function () {
        deferred.reject(Exception.ACTIVITY_STATUS_UPDATING_ERROR);
      });

    return deferred.promise;
  };

  module.exports = {
    updateActivityStatus: updateActivityStatus
  };

}());
