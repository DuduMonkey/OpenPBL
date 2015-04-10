'use strict';

//http://www.kdelemme.com/2014/03/09/authentication-with-angularjs-and-a-node-js-rest-api/
//https://www.npmjs.com/package/json-web-token

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jwt = require('jwt-simple');
var Q = require ('Q');


var TokenSchema = new Schema({
  email: String,
  token: String,
  expirationTime: {type: Date, expireAfterSeconds: 3600, default: Date.now}
});


//Middlaware for hashing password before save on database
TokenSchema.pre('save', function(next){

  var tokenEntity = this;

  if(!tokenEntity.isModified('token')) return next();

  var sessionSecret = process.env.SECRET;

  var tokenHash = jwt.encode({ email: tokenEntity.email }, sessionSecret);

  if(tokenHash){

    tokenEntity.token = tokenHash;
    next();

  }else{

    return {error : 'Erro no hash de senha'};
    
  }

});

module.exports = mongoose.model('Token', TokenSchema);
