var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: {Type: Number, min: 1, max, 10},
  name: String,
  role: String
});

module.exports = mongoose.model('User', RattusSchema);
