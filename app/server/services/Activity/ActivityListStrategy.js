(function () {
  'use strict';

  var Q = require('q');
  var Role = require('../../models/constants/user_role');
  var Activity = require('../../models/Activity');

  function ActivityListStrategy() {

    /**
      Busca as atividades do professor (criador) da atividade
    **/
    var getTeacherActivities = function (userId) {
      var deferred = Q.defer();

      //Activities select name, story, created, participants, status where _creator = user._id
      Activity.queryInActivities({
        select: '_id name story created participants status posts',
        where: ['_creator'],
        conditions: [userId],
        join: [
          {
            path: 'participants',
            select: '_id name'
          },
          {
            path: 'story',
            select: '-_id description'
          },
          {
            path: 'posts',
            select: '-_id _creator content type date'
          }
        ]
      })
        .then(function (activities) {
          deferred.resolve(activities);
        })
        .catch(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    /**
      Busca as atividades do aluno (participante) da atividade
    **/
    var getStudentActivities = function (userId) {
      var deferred = Q.defer();

      //Activities select name, story, created, participants, status where participants contains user._id
      Activity.queryInActivities({
        select: '_id name story created participants status posts',
        where: ['participants'],
        conditions: [userId],
        join: [
          {
            path: 'participants',
            select: '_id name'
          },
          {
            path: 'story',
            select: '-_id description'
          },
          {
            path: 'posts',
            select: '-_id _creator content type date'
          }
        ]
      })
        .then(function (activities) {
          deferred.resolve(activities);
        })
        .catch(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    // Strategy Method
    var getUserActivities = function (user) {
      var deferred = Q.defer();

      switch (user.role) {
      case Role.TEACHER.value:
        return getTeacherActivities(user._id);
      case Role.STUDENT.value:
        return getStudentActivities(user._id);
      }

      return deferred.promise;
    };

    return {
      getUserActivities: getUserActivities
    };
  }

  module.exports = ActivityListStrategy;
}());
