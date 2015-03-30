var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bcrypt = require ('bcrypt-nodejs');

var UserSchema = new Schema({
  id: {Type: Number, min: 1, max, 10},
  name: String,
  role: {Type: Number, min: 1, max, 1},
  local: {
    email: String,
    password: String
  }
});


UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.gentSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
  return bcrypt.comparSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
