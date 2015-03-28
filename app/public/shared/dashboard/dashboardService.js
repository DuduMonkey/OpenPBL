angular.module('openpbl.services')
  .factory('dashboardService', ['$http', '$q', function ($http, $q) {
    return {
      getTasks: function () {
        var deferred = $q.defer();

        var url = 'http://private-bec97-openpbl.apiary-mock.com/api/dashboard/full';

        $http.get(url)
          .then(function (response) {
            deferred.resolve({data: response.data.tasks});
          })
          .catch(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      }
    }
  }]);
