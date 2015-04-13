'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var Q = require ('q');

var UserSchema = new Schema({
  name: { type: String, required: true},
  role: { type: Number, min: 1, max: 2, required: true},
  email: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true }
});

//Middlaware for hashing password before save on database
UserSchema.pre('save', function(next){
  var user = this;

  if(!user.isModified('password')) return next();

  var hash = bcrypt.hashSync(user.password);

  if(hash){
    user.password = hash;
    next();
  }else{
    return {error : 'Erro no hash de senha'};
  }
});

//password decrypt and compare
UserSchema.methods.validatePassword = function(candidatePassword){

  var deferred = Q.defer();

  var isMatch = bcrypt.compareSync(candidatePassword, this.password);
  
  if(isMatch){
    
    deferred.resolve(isMatch);

  }else{

    var error = 'Senha não confere';
    deferred.reject(error);

  }

  return deferred.promise;
};

module.exports = mongoose.model('User', UserSchema);
