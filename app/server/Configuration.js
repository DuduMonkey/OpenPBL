/*global process, module*/
(function () {
  'use strict';

  // Declare express app as global
  var globalApplication;

  // Database connection address, by default its the local mongo instance.
  var databaseURI = process.env.CONN_STRING || 'localhost:27017';

  // Auxiliar function, generate one Random Numeric word
  var generateRandomWord = function () {
    var randomDecimalString = Math.random().toString();

    var randomMathWord = randomDecimalString.split('.')[1];

    return randomMathWord;
  };

  /**
    Private Fields:

      configurePublicPath     =>  Set the default public acessible path as 'app/public'

      configureCookieParser   =>  Get all the cookies baby (͡°͜ʖ͡°)

      configureBodyParser     =>  Enable parsing html forms and URL encoded JSON

      configureDatabase       =>  Gear UP the database mongoose communication, 
                                  by default, 'mongodb://' is already set.

      configureSessionSecret  =>  Validate the session secret, case the environment 
                                  variable are undefined, uses one randomic generated
                                  word as SECRET
  */
  var configurePublicPath = function (express, path) {
    globalApplication.use(express.static(path.resolve('app/public')));
  };

  var configureCookieParser = function (cookieParser) {
    globalApplication.use(cookieParser());
  };

  var configureBodyParser = function (bodyParser) {
    globalApplication.use(bodyParser.json());
    globalApplication.use(bodyParser.urlencoded({ extended: true }));
  };

  var configureDataBase = function (databasEngine, url) {
    var connectionString = 'mongodb://' + url;
    databasEngine.connect(connectionString);
  };

  var configureSessionSecret = function () {
    process.env.SECRET = process.env.SECRET || generateRandomWord();
  };

  // Initalize all the express server configurations.
  module.exports = function (express, app, path, mongoose, cookieParser, bodyParser) {

    //set the global app
    globalApplication = app;

    configurePublicPath(express, path);

    configureCookieParser(cookieParser);

    configureBodyParser(bodyParser);

    configureDataBase(mongoose, databaseURI);

    configureSessionSecret();
  };
}());
