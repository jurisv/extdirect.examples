//Database driver reference can be found here:
//http://mongodb.github.io/node-mongodb-native/

var mongodb = require('mongodb'),
    nconf = require('nconf');

//nconf.env().file({ file: 'db-config.json'});
nconf.env().file({ file: 'db-config-mongolab.json'});

var dbConfig = nconf.get();

var db = {

    database: null,

    config: dbConfig,

    mongo: mongodb,

    client: null,

    init :function(fn){
        var cfg = this.config;
        this.client = new this.mongo.MongoClient(new this.mongo.Server(cfg.hostname, cfg.port, {auto_reconnect: cfg.auto_reconnect}));
        this.database = this.client.db(cfg.db);

        if(fn){
            fn();
        }
    },

    getId: function(id){
        return new this.mongo.ObjectID(id);
    },

    execute : function(callback, collectionName){
        var me = this;

            this.client.open(function(err, cli) {
                if(err){
                    var cfg = this.config;
                    console.error('Connection had errors: ', err.code);
                    console.error('Connection params used: hostname = ' +  cfg.hostname + ', port = ' + cfg.port + ', db = '+  cfg.db );
                    process.exit(1);
                }
                else{
                    if (callback) {
                        me.database.authenticate(me.config.dbusername, me.config.dbpassword,
                            {
                                authMechanism: 'MONGODB-CR'  // not recommended because clear text
                                //authMechanism: 'MONGODB-X509'
                            },
                            function (err) {
                                if (collectionName) {
                                    callback(me.database.collection(collectionName));
                                } else {
                                    callback();
                                }
                            });
                    }
                }
            });

    },

    close : function(){
        this.client.close();
    },

    removeCollection:function(collectionName){
        this.database.dropCollection(collectionName);
    },

    debugError: function(fn, error){
        // Generate SOFT error, instead of throwing hard error.
        // We send messages with debug ingo only if in development mode
        this.close();
        if(global.App.mode === 'development'){
            fn({message: {
                text: 'Database error',
                debug: error.toString()
            }
            });
        }else{
            fn({message: {
                text: 'Unknown error',
                debug: null
            }
            });
        }
    }
};

//connect to db and open connection
db.init(
    function(){
        db.execute(
            function(){
                console.log('Successfully connected to database: ' + db.config.db);
                db.close();
            }
        );
    }
);

// Make mongodb object available globally, so we can access it from the modules
// Store inside database property of App
global.App.database = db;