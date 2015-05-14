var mysql = require('mysql'),
    cfg = require('./db-config');

function MySQL(config) {

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

        //add alias for debug
        this.connection.debug = this.debug;

        return this.connection;
    };

    this.disconnect = function() {
        this.connection.end();
    };

    this.debug = function(err, callback) {
        // Generate SOFT error, instead of throwing hard error.
        // We send messages with debug info only if in development mode

        if(global.App.env === 'development') {
            callback({
                message: {
                    text: 'Database error',
                    debug: err
                }
            });
        }else{
            callback({
                message: {
                    text: 'Unknown error',
                    debug: null
                }
            });
        }
    }
}

global.App.database = new MySQL(cfg);
