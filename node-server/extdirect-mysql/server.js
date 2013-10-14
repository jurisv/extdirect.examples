var express = require('express'),
    nconf = require('nconf'),
    http = require('http'),
    path = require('path'),
    mysql = require('mysql'),
    extdirect = require('extdirect');

nconf.env().file({ file: 'config.json'});

var ServerConfig = nconf.get("ServerConfig"),
    MySQLConfig = nconf.get("MySQLConfig"),
    ExtDirectConfig = nconf.get("ExtDirectConfig");

var app = express();

if(ServerConfig.enableSessions){
    //memory store for sessions - change to different storage here to match your implementation.
    var store  = new express.session.MemoryStore;
}

var mySQL = {
    connect : function(){
        var conn = mysql.createConnection({
            host: MySQLConfig.hostname,
            port: MySQLConfig.port,
            user: MySQLConfig.user,
            password: MySQLConfig.password,
            database: MySQLConfig.db
        });

        conn.connect(function(err) {
            if(err){
                console.error('Connection had errors: ', err.code);
                console.error('Connection params: ', MySQLConfig.hostname,MySQLConfig.user, MySQLConfig.db );
                process.exit(1);
            }
        });

        return conn;
    },

    disconnect : function(conn){
        conn.end();
    }
};

// Make MySql connections available globally, so we can access them from within modules
global['mySQL'] =  mySQL;

app.configure(function(){

    app.set('port', process.env.PORT || ServerConfig.port);
    app.use(express.logger(ServerConfig.logger));

    if(ServerConfig.enableUpload){
        app.use(express.bodyParser({uploadDir:'./uploads'})); //take care of body parsing/multipart/files
    }

    app.use(express.methodOverride());

    if(ServerConfig.enableCompression){
        app.use(express.compress()); //Performance - we tell express to use Gzip compression
    }

    if(ServerConfig.enableSessions){
        //Required for session
        app.use(express.cookieParser());
        app.use(express.session({ secret: ServerConfig.sessionSecret, store: store }));
    }

    app.use(express.static(path.join(__dirname, ServerConfig.webRoot)));
});

//Important to get CORS headers and cross domain functionality
if(ServerConfig.enableCORS){
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.options(ExtDirectConfig.classPath, function(request, response) {
        response.writeHead(200, {'Allow': ServerConfig.allowedMethods});
        response.end();
    });
}

//GET method returns API
app.get(ExtDirectConfig.apiPath, function(request, response) {
    try{
        var api = extdirect.getAPI(ExtDirectConfig);
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(api);
    }catch(e){
        console.log(e);
    }
});

// Ignoring any GET requests on class path
app.get(ExtDirectConfig.classPath, function(request, response) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({success:false, msg:'Unsupported method. Use POST instead.'}));
});

// POST request process route and calls class
app.post(ExtDirectConfig.classPath, function(request, response) {
    extdirect.processRoute(request, response, ExtDirectConfig);
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});