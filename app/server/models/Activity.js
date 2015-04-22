/*global module, require*/
(function () {
  'use strict';

  // Modules in use
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var ActivitySchema = new Schema({
    _creator: { type: Number, ref: 'User' },
    name: { type: String, required: true},
    story: String,
    status: {type: Number, min: 1, max: 7, default: 1},
    created: {type: Date, default: Date.now},
    participants: [{ type: Number, ref: 'User'}]
  });

  module.exports = mongoose.model('Activity', ActivitySchema);
}());
