/*global module, require*/
(function () {
  'use strict';

  var user_role = require('../../models/constants/user_role');
  var Exception = require('../../shared/Exceptions');
  var Q = require('q');

  /** Parse all roles from user_role to an simple JSON List **/
  var getRolesAsSimpleJSONList = function () {
    var simpleRoleJSONList = [];

    for (var type in user_role) {
      var role = user_role[type];
      simpleRoleJSONList.push({ name: role.name, value: role.value });
    }

    return simpleRoleJSONList;
  };

  /** Get the role object for the passed value **/
  var getRoleByValue = function (value) {
    var deferred = Q.defer();

    var role = null;

    for (var type in user_role) {
      role = user_role[type];

      if (role.value == value) {
        deferred.resolve(role);
      }
    }

    if (!role) {
      deferred.reject(Exception.ROLE_VALUE_NOT_ASSIGNED);
    }

    return deferred.promise;
  };

  // Export the module as the singleton RegisterUser type
  module.exports = {
    getRoleBag: getRolesAsSimpleJSONList,
    getRoleByValue: getRoleByValue
  };
}());
