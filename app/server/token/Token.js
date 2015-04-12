/*global module, require, process*/
'use strict';

// Modules in use
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jwt-simple');

// Create a Token Scheme (Entity)
// email          -> unique                   =>  asserts 1:1 token for users
// token          -> hashing                  =>  asserts securty for tokens
// expirationTime -> Date.now + 3600 seconds  =>  asserts auto-delete from database
var TokenSchema = new Schema({
  email: String,
  token: String,
  expirationTime: {type: Date, expireAfterSeconds: 3600, default: Date.now}
});


/** 
  Middleware for 'save' operation on this model
  
  Uses the environment variable SECRET or generate one random string if SECRET = undefined
  "In case os missused export SECRET=yaddayadda"
  
  Generate the hash using JSON Web Token (jwt)

  return the token if that are save
*/
TokenSchema.pre('save', function(next) {
  var tokenEntity = this;

  if (!tokenEntity.isModified('token')) { 
    return next();
  }

  var sessionSecret = process.env.SECRET || generateRandomWord();

  var tokenHash = jwt.encode({ email: tokenEntity.email }, sessionSecret);

  if (tokenHash) {
    tokenEntity.token = tokenHash;
    
    next();
  }
    return { error: 'Erro no hash de senha' };
});

// Generate one Random Numeric word
var generateRandomWord = function(){
  var randomDecimalString = Math.Random().toString();

  var randomMathWord = randomDecimalString.split('.')[1];

  return randomMathWord;
};

//Export the module as Token
module.exports = mongoose.model('Token', TokenSchema);
