//Database driver reference can be found here:
//http://mongodb.github.io/node-mongodb-native/



//Connect to db. This will test connection for given scenario.
//db.init(
//    function(){
//        if (cfg.enableAuthorization){
//            db.authorize(cfg.authMechanism, cfg.username, cfg.password, function(){
//                console.log('Successfully connected to database [Authentification enabled]: ' + db.config.db);
//                db.close();
//            });
//        }else{
//            console.log('Successfully connected to database: ' + db.config.db);
//            db.close();
//        }
//    }
//);

//WIP
var mongodb = require('mongodb'),
    cfg = require('./db-config');

function MongoDB(config){

    this.database = null;

    this.config = cfg;

    this.mongo =  mongodb;

    this.client = null;

    this.init = function(fn){
        this.client = new this.mongo.MongoClient(new this.mongo.Server(cfg.hostname, cfg.port, {auto_reconnect: cfg.autoReconnect}));
        this.database = this.client.db(cfg.db);

        if(fn){
            fn();
        }
    };

    this.getId = function(id){
        return new this.mongo.ObjectID(id);
    };

    this.processError = function(err){
        if(global.App.mode === 'development'){
            console.error('Connection had errors! Code:', err.code, ', '+err.name + ':', err.errmsg);
            console.error('Connection params used: hostname = ' +  cfg.hostname + ', port = ' + cfg.port + ', db = '+  cfg.db, ', enableAuthorization =', cfg.enableAuthorization);
            if(cfg.breakOnError)
                process.exit(1);
        }
    };

    this.execute = function(callback, collectionName){
        var me = this;

        if (callback) {
            var cb = function(db, collectionName) {
                collectionName ? callback(db.collection(collectionName)) : callback();
            };

            if (cfg.enableAuthorization) {
                db.authorize(cfg.authMechanism, cfg.username, cfg.password,
                    function(){
                        cb(me.database, collectionName);
                    });

            } else {
                this.client.open(function(err, cli) {
                    if(err){
                        me.processError(err);
                    }
                    else{
                        cb(me.database, collectionName);
                    }
                });
            }
        }
    };

    this.close = function() {
        this.client.close();
    };

    this.removeCollection = function(collectionName) {
        this.database.dropCollection(collectionName);
    };

    this.debugError = function(error, callback) {
        // Generate SOFT error, instead of throwing hard error.
        // We send messages with debug ingo only if in development mode
        this.close();
        if(global.App.env === 'development') {
            callback({message: {
                text: 'Database error',
                debug: error.toString()
            }
            });
        }else{
            callback({message: {
                text: 'Unknown error',
                debug: null
            }
            });
        }
    };

    this.authorize = function(method, username, password, fn) {
        var me = this;

        me.client.open(function(err, cli) {
            if(err) {
                me.processError(err);
            }
            else{
                me.database.authenticate(username, password, {
                        authMechanism: method
                    },
                    function (err, result) {
                        if(err){
                            me.processError(err);
                        }
                        if(fn)fn();
                    }
                );
            }
        });
    };
}

global.App.database = new MongoDB(cfg);
//TODO: Router param: autoConnect . Will open db connection at the beginning of router batch and close once it's done