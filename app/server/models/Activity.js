/*global module, require*/
(function () {
  'use strict';

  // Modules in use
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var ActivitySchema = new Schema({
    id: {
      type: mongoose.Schema.ObjectId,
      default: mongoose.Types.ObjectId
    },
    creator: { type: Number, ref: 'User' },
    name: String,
    story: String,
    status: {type: Number, min: 1, max: 2, required: true},
    created: {type: Date, default: Date.now},
    participants: [{ type: Number, ref: 'User'}]
  });

  module.exports = mongoose.model('Activity', ActivitySchema);
}());
