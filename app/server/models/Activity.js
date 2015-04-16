/*global module, require*/
'use strict';

// Modules in use
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  id: {Type: Number, min: 1, max: 10},
  name: String,
  state: {Type: Number, min: 1, max: 1},
  story: String,
  startDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Activity', ActivitySchema);
