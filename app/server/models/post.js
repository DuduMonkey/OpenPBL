var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  id: {Type: Number, min: 1, max, 10},
  content: String,
  type: String,  
});

module.exports = mongoose.model('Post', RattusSchema);
