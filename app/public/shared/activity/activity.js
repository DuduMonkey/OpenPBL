(function () {
  'use strict';

  angular.module('openpbl.directives')
    .directive('pblActivity', ['$log', '$q', '$location', 'activityService', 'globalValues', 'notificationService', 
      function ($log, $q, $location, activityService, globalValues, notificationService) {
      return {
        retrict: 'E',
        templateUrl: '/shared/activity/activity.tpl.html',
        scope: {
          activity: '='
        },
        link: function (scope) {
          var init = function () {
            scope.vm = {};
            loadActivityStatus(scope.activity, scope.activity.status)
              .then(function (response) {
                scope.vm.activity = response;
                scope.content = getContentTabByStatus(scope.vm.activity.status);
              })
              .catch(function (error) {
                notificationService.error('Erro', error);
              });
          };

          var getApiAddMethodByContent = function (content) {
            switch (content) {
              case 'tab-facts':
                return 'addActivityFact';

              case 'tab-hypothesis':
                return 'addActivityHypothesis';

              case 'tab-resolution':
                return 'addActivityResolution';
            }
          };

          var getApiDeleteMethodByContent = function (content) {
            switch (content) {
              case 'tab-facts':
                return 'deleteActivityFact';

              case 'tab-hypothesis':
                return 'deleteActivityHypothesis';

              case 'tab-resolution':
                return 'deleteActivityResolution';
            }
          };

          var getContentTabByStatus = function (status) {
            var activityStatus = globalValues.activity.status;

            switch (status) {
              case activityStatus.CREATING_STORY:
                return 'tab-problem';

              case activityStatus.GENERATING_FACTS:
                return 'tab-facts';

              case activityStatus.IDENTIFYING_HIPOTESYS:
                return 'tab-hypothesis';

              case activityStatus.RESEARCHING:
                return 'tab-research';

              case activityStatus.RESOLVING_PROBLEM:
                return 'tab-resolution';

              case activityStatus.ABSTRACTING:
                return 'tab-abstraction';

              case activityStatus.FINISHED:
                return 'tab-abstraction';
            }
          };

          var getStatusByContentTab = function (status) {
            var activityStatus = globalValues.activity.status;

            switch (status) {
              case 'tab-problem':
                return activityStatus.CREATING_STORY;

              case 'tab-facts':
                return activityStatus.GENERATING_FACTS;

              case 'tab-hypothesis':
                return activityStatus.IDENTIFYING_HIPOTESYS;

              case 'tab-research':
                return activityStatus.RESEARCHING;

              case 'tab-resolution':
                return activityStatus.RESOLVING_PROBLEM;

              case 'tab-abstraction':
                return activityStatus.ABSTRACTING;
            }
          };

          var loadActivityStatus = function (activity, status) {
            var deferred = $q.defer()
            , statusName = activityService.getStatusPropertyName(status);

            activityService.getActivityStatusData(activity.id, status)
              .then(function (response) {
                if (angular.isDefined(response[statusName])) {
                  response = response[statusName];
                }

                activity[statusName] = response;
                deferred.resolve(activity);
              })
              .catch(function (error) {
                deferred.reject(error);
              });

            return deferred.promise;
          };

          /**
           * Salva um item da atividade
           */
          var saveActivityItem = function (activityId, apiMethod, item, fromModal) {
            var status;

            if (angular.isUndefined(activityService[apiMethod])) {
              return;
            }

            activityService[apiMethod](activityId, item)
              .then(function (response) {
                notificationService.success(response.message);

                // Verifica se ação foi disparda por modal,
                // se sim, fecha ela
                if (angular.isDefined(fromModal)) {
                  scope.toggleModal(fromModal);
                }

                status = getStatusByContentTab(scope.content);

                // Recarrega a ativade
                loadActivityStatus(scope.vm.activity, status)
                  .then(function (response) {
                    scope.vm.activity = response;
                  });
              })
              .catch(function (error) {
                $log.error(error);
                notificationService.error(error.message);
              });
          };

          scope.addItemToList = function (list, item) {
            if (Array.isArray(list) && list.indexOf(item) === -1) {
              list.push(item);
            }
            
            item = null;
          };

          scope.canShowStatus = function (tabName, comparator) {
            if (!scope.vm || !scope.vm.activity) return false;

            var tabStatus = getStatusByContentTab(tabName)
            , status = scope.vm.activity.status;

            switch (comparator) {
              case 'eq':
                return tabStatus === status;

              case 'get':
                return tabStatus >= status;

              case 'let':
                return tabStatus <= status;

              case 'gt':
                return tabStatus > status;

              case 'lt':
                return tabStatus < status;

              default:
                return tabStatus === status;
            }
          };

          scope.removeItemFromList = function (list, index) {
            if (Array.isArray(list)) {
              list = list.splice(index, 1);
            }
          };

          /**
           * Salva o problema
           */
          scope.saveStory = function (from) {
            var activityId = scope.vm.activity.id
            , apiMethod = 'saveActivityStory'
            , story = scope.vm.activity.story;

            saveActivityItem(activityId, apiMethod, story, from);
          };

          /**
           * Salva pesquisa
           */
          scope.saveReasearch = function (from) {
            var activityId = scope.vm.activity.id
            , apiMethod = 'saveActivityResearch'
            , story = scope.vm.activity.research;

            saveActivityItem(activityId, apiMethod, story, from);
          };

          scope.addPost = function (post, from) {
            var activityId = scope.vm.activity.id
            , apiMethod = getApiAddMethodByContent(scope.content);

            saveActivityItem(activityId, apiMethod, post, from);
            scope.postContent = null;
          };

          scope.deletePost = function (postId, from) {
            var activityId = scope.vm.activity.id
            , apiMethod = getApiDeleteMethodByContent(scope.content)
            , confirmModal = angular.element('#confirmDeletePostModal');

            confirmModal
              .modal('toggle')
              .one('click', '#confirmDeletePost', function () {
                saveActivityItem(activityId, apiMethod, postId, from);
              });
          };

          scope.nextStatus = function () {
            var activityId = scope.vm.activity.id
            , currentStatus = scope.vm.activity.status
            , confirmModal = angular.element('#nextStatusModal');

            // Callback de confirmação
            var callback = function () {
              activityService.nextStatus(activityId, currentStatus)
                .then(function (response) {
                  notificationService.success(response.message);

                  // Atualiza status da atividade
                  scope.activity.status = response.status;
                  init();
                })
                .catch(function (error) {
                  notificationService.error(error.message);
                });
            };

            confirmModal
              .modal('toggle')
              .one('click', '#confirmNextStatus', function () {
                callback();
              });
          };

          scope.finishActivity = function () {
            var activityId = scope.vm.activity.id
            , currentStatus = scope.vm.activity.status
            , confirmModal = angular.element('#finishActivityModal');

            var callback = function () {
              activityService.nextStatus(activityId, currentStatus)
                .then(function (response) {
                  notificationService.success(response.message);

                  // Atualiza status da atividade
                  scope.activity.status = response.status;
                  $location.path('/dashboard');
                })
                .catch(function (error) {
                  notificationService.error(error.message);
                });
            };

            confirmModal
              .modal('toggle')
              .one('click', '#confirmFinishActivity', function () {
                callback();
              });
          };

          scope.toggleModal = function (modalName) {
            angular.element(modalName).modal('toggle');
          };

          scope.$watch('content', function () {
            if (angular.isUndefined(scope.vm)) {
              return;
            }
            
            var currentTab = getContentTabByStatus(scope.vm.activity.status)
            , status;

            if (scope.content === currentTab) {
              return;
            }

            status = getStatusByContentTab(scope.content);

            loadActivityStatus(scope.vm.activity, status)
              .then(function (response) {
                scope.vm.activity = response;
              })
              .catch(function (error) {
                $log.error('error', error);
              });
          });

          scope.$watch('activity', function () {
            if (angular.isDefined(scope.activity)) {
              init();
            }
          });
        }
      };
    }]);
}());
