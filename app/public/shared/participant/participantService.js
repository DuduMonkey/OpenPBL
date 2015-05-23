(function () {
  'use strict';

  angular.module('openpbl.services')
    .factory('participantService', ['$http', '$q', 'globalValues', function ($http, $q, globalValues) {
      var addParticipant = function (activityId, participantEmail) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/participant'
        , data = {
          email: participantEmail
        };

        $http.post(url, data)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      };

      var deleteParticipant = function (activityId, participantId) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/participant/' + participantId;

        $http.delete(url)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      };

      var getParticipants = function (activityId) {
        var deferred = $q.defer()
        , url = globalValues.API_URL + '/activity/' + activityId + '/participant';

        $http.get(url, { cache: false })
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      };

      return {
        addParticipant: addParticipant,
        deleteParticipant: deleteParticipant,
        getParticipants: getParticipants
      };
    }]);
})();
