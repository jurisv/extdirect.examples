//var mysql = require('mysql'),
//    nconf = require('nconf');
//
//nconf.env().file({ file: 'db-config.json'});
//
//var dbConfig = nconf.get();
//
//var mySQL = {
//    connect : function(){
//        var conn = mysql.createConnection({
//            host: dbConfig.hostname,
//            port: dbConfig.port,
//            user: dbConfig.user,
//            password: dbConfig.password,
//            database: dbConfig.db
//        });
//
//        conn.connect(function(err) {
//            if(err){
//                console.error('Connection had errors: ', err.code);
//                console.error('Connection params used: hostname = ' +  dbConfig.hostname + ', username = ' + dbConfig.user + ', db = '+  dbConfig.db );
//                process.exit(1);
//            }
//        });
//
//        return conn;
//    },
//
//    disconnect : function(conn){
//        conn.end();
//    },
//
//    debugError: function(fn, error){
//        // Generate SOFT error, instead of throwing hard error.
//        // We send messages with debug ingo only if in development mode
//
//        if(global.App.mode === 'development'){
//            fn({message: {
//                text: 'Database error',
//                debug: error
//            }
//            });
//        }else{
//            fn({message: {
//                text: 'Unknown error',
//                debug: null
//            }
//            });
//        }
//    }
//};
//
////test db connection and terminate if connection fails
//
//var conn = mySQL.connect();
//
//
//
//// Make MySql connections available globally, so we can access them from within modules
////Store inside database property of App
//global.App.database = mySQL;
//


//----------

var mysql = require('mysql'),
    cfg = require('./db-config');

function MySQL(config){

    this.connection = null;

    this.connect = function(){
        this.connection = mysql.createConnection({
            host: config.hostname,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.db
        });

        this.connection.connect(function(err) {
            if(err){
                console.error('Connection had errors: ', err.code);
                console.error('Connection params used: hostname = ' +  config.hostname + ', username = ' + config.user + ', db = '+  config.db );
                process.exit(1);
            }
        });
    };

    this.disconnect = function(){
        this.connection.end();
    };

    this.debug = function(fn, error){
        // Generate SOFT error, instead of throwing hard error.
        // We send messages with debug info only if in development mode

        if(global.App.mode === 'development'){
            fn({
                message: {
                    text: 'Database error',
                    debug: error
                }
            });
        }else{
            fn({
                message: {
                    text: 'Unknown error',
                    debug: null
                }
            });
        }
    }
}

global.App.database = new MySQL(cfg);
//TODO: Router param: autoConnect . Will open db connection at the beginning of router batch and close once it's done