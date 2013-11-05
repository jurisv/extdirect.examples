var express = require('express'),
    nconf = require('nconf'),
    http = require('http'),
    path = require('path'),
    mysql = require('mysql'),
    mongodb = require('mongodb'),
    extdirect = require('extdirect'),
    async = require('async');

nconf.env().file({ file: 'config.json'});

var ServerConfig = nconf.get("ServerConfig"),
    MySQLConfig = nconf.get("MySQLConfig"),
    MongoDBConfig = nconf.get("MongoDBConfig"),
    ExtDirectConfig = nconf.get("ExtDirectConfig");

var app = express();

if(ServerConfig.enableSessions){
    //memory store for sessions - change to different storage here to match your implementation.
    var store  = new express.session.MemoryStore;
}

global.mySQL = {
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

var mongoClient =
        new mongodb.MongoClient(
                new mongodb.Server(
                        MongoDBConfig.hostname || 'localhost',
                        MongoDBConfig.port || MongoDbConnection.DEFAULT_PORT,
                        { auto_reconnect: true }),
                { w: 1 });

// note: make MongoDB connections available globally, so we can access them from within modules
global.mongoDb = mongoClient.db(MongoDBConfig.db);

function openDbAndPossiblyPrime(openDbAndPossiblyPrime_callback) {
    async.auto({
        openDb: function openDb(async_auto_callback) {
            mongoDb.open(function open_calledback(err, openedDb) {
                if (err) { async_auto_callback(err); return; }
                // openedDb should be equal mongoDb,
                // pool is ready to use now
                async_auto_callback(null, openedDb);
            });
        },
        probeTodoItemCollection: ["openDb", function probeTodoItemCollection(async_auto_callback, results_so_far) {
            mongoDb.collection("todoitem", {strict:true}, function collection_calledback(err, collection) {
                if (err) { async_auto_callback(); return; } // try creating then
                async_auto_callback(null, collection);
                });
            }],
        createTodoItemCollection: ["probeTodoItemCollection", function createTodoItemCollection(async_auto_callback, results_so_far) {
            if (results_so_far.probeTodoItemCollection) { async_auto_callback(); return; } // no need to create
            mongoDb.createCollection("todoitem", function createCollection_calledback(err, createdCollection) {
                if (err) { async_auto_callback(err); return; }
                async_auto_callback(null, createdCollection);
                });
            }],
        primeTodoItemCollection: ["createTodoItemCollection", function primeTodoItemCollection(async_auto_callback, results_so_far) {
            if (!results_so_far.createTodoItemCollection) { async_auto_callback(); return; } // no need to prime
            results_so_far.createTodoItemCollection.insert(
                {"_id":"1","text":"Example todo item"},
                function insert_calledback(err, collectionAgain) {
                    if (err) { async_auto_callback(err); return; }
                    async_auto_callback(null, collectionAgain);
                }
            )
            }]
        },
        function async_auto_callback(err, results_so_far) {
            if (err) { openDbAndPossiblyPrime_callback(err); return; }
            openDbAndPossiblyPrime_callback(null, results_so_far.openDb); // note: not known anyone needs result
        });
}

openDbAndPossiblyPrime(function openDbAndPossiblyPrime_calledback(err, results) {
    if (err) throw err;
});

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
