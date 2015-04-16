/*global module, require, process*/
'use strict';

// Modules in use
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  id: { Type: Number, min: 1, max: 10 },
  content: String,
  type: { Type: Number, min: 1, max: 1 }
});

module.exports = mongoose.model('Post', PostSchema);
