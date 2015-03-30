var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  id: {Type: Number, min: 1, max, 10},
  content: String,
  type: {Type: Number, min: 1, max, 1},  
});

module.exports = mongoose.model('Post', PostSchema);
