/*global module*/
(function () {
  'use strict';

  var declareNewRole = function (roleValue, roleName) {
    var newRole = { name: roleName, value: roleValue };
    return newRole;
  };

  module.exports = {
    TEACHER: declareNewRole(1, "Professor"),
    STUDENT: declareNewRole(1, "Aluno")
  };
}());
