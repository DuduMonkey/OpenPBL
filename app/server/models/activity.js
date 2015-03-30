var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  id: {Type: Number, min: 1, max, 10},
  name: String,
  state: {Type: Number, min: 1, max, 1},
  story: String
});

module.exports = mongoose.model('Activity', ActivitySchema);
