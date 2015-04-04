var globalApplication;

module.exports = function(express,app,path,mongoose,cookieParser,bodyParser,session){

  //set the global app
  globalApplication = app;

  // Environment & Configuration Variables
  var environment = process.env.NODE_ENV;
  var databaseURI = process.env.CONN_STRING;
  var sessionSecret = process.env.APP_SECRET;

  //Configure context
  configurePublicPath(express,path);

  configureCookieParser(cookieParser);

  configureBodyParser(bodyParser);

  configureDataBase(mongoose,databaseURI);

};


var configurePublicPath = function(express,path){
  globalApplication.use(express.static(path.resolve('app/public')));
};

var configureCookieParser = function(cookieParser){
  globalApplication.use(cookieParser()); //read cookies (required for auth)
};

var configureBodyParser = function(bodyParser){
  globalApplication.use(bodyParser.json()); //get information from html forms
  globalApplication.use(bodyParser.urlencoded({
    extended: true
  }));

};

/*
var configureSession = function(session, secret){
  globalApplication.use(session({ 
    secret: secret, // session secret
    saveUninitialized: true,
    resave: false
  })); 
}
*/

var configureDataBase = function(engine, url){
  // Database Connection
  var connectionString = "mongodb://" + url;

  engine.connect(connectionString);
}
