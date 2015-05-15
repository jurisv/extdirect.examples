//Database driver reference can be found here:
//http://mongodb.github.io/node-mongodb-native/

//Small helper for connection
var mongodb = require('mongodb'),
    cfg = require('./db-config');

var MongoClient = mongodb.MongoClient;

function MongoDB(config){

    this.connect = function (callback){
        var me = this,
            url = 'mongodb://' + config.hostname + ':' + config.port + '/' + config.db,
            serverCfg = {
                socketOptions: {
                    autoReconnect: config.autoReconnect
                }
            };

        MongoClient.connect(url, {server: serverCfg}, function (err, db) {
            if (err) {
                me.debug(err, callback);

            } else {

                if (config.enableAuthorization) {
                    db.authenticate(config.username, config.password, {authMechanism: config.authMechanism}, function(err, result) {
                        if(err){
                            me.debug(err, callback);
                        } else {

                            if(callback){
                                callback(err, db);
                            }
                        }
                    });
                } else {
                    if(callback){
                        callback(err, db);
                    }
                }
            }
        });
    };

    this.getId = function(id){
        return new mongodb.ObjectId(id);
    };

    this.debug = function(err, callback) {
        // Generate SOFT error, instead of throwing hard error.
        // We send messages with debug info only if in development mode

        if(global.App.env === 'development') {
            callback(err);
        }else{
            callback({
                message: {
                    text: 'Unknown error',
                    debug: null
                }
            });
        }
    };
}

var mongo = new MongoDB(cfg);
global.App.database = mongo;

//Test connection to db.
mongo.connect(function(err, db) {
    if(err) {
        console.log('Error', err);
    } else {
        console.log('Successfully tested connection to database "'+ cfg.db + '" with [Authentification enabled]: ' + cfg.enableAuthorization);
    }

    db.close();
    console.log('Connection closed');
});