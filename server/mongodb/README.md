###Sample node.js server implementation for Ext.Direct using MongoDB database server

First you hve to adjust configuration values inside db-config.json and server.json config files.

Then launch server from commandline : node server.js

This server relies on existence of MongoDB server. Adjust settings in db-config.json

File data.sql contains structure and dummy data for reference implementation.

Database name used: extdirectnode

You have to run matching ExtJs/Touch application to see it in action.

<b>Note:</b> this repository does not include any npm modules. After cloning the repository you have to run 'npm install' to retrieve matching modules.

###Structure

    * Folder 'direct' contains all Direct classes
    * Folder 'uploads' is required if you have intentions of uploading any files via the server.
    * server-config.json - config variables for the server
    * direct-config.json - config variables for the direct connector
    * db-config.json - config variables for the database
    * server.js - Main server file
    * server-db.js - Database helper to handle connection. If you want to implement different type of database, make any changes to this file
    * todoitem.json - initial dataset


###MongoDb quickstart

Step 1: Download : http://www.mongodb.org/downloads

Step 2: Configure and start server

    MAC: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/
    Linux: http://docs.mongodb.org/manual/administration/install-on-linux/
    Windows: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/

Step 3: Import initial sample data from todoitem.json (optional)
    From terminal:


    mongoimport --db extdirectnode --collection todoitem --jsonArray --file todoitem.json


We highly recommend adding adding mongodb/bin to you PATH as this makes everything a lot easier.

<b>Step 4: Important! Add mapping in models</b>

```js
fields: [
    {
        name: 'id',
        mapping: '_id' // <- this is important
    },
    {
        name: 'text'
    },
    {
        name: 'complete',
        type: 'boolean'
    }
],
 ```

###MongoDb Authentification

This guide is valid for MongoDB version 3.x+. Please verify your version and upgrade as necessary.

By default MongDb does not require any sort of authentification. With that in mind everyone has access to your database.
While it might seem okay for development purposes, it would be a great idea to enable one of the authentification methods to disable such an access.
This will be required if you would like to access remote DB server like one hosted by MobgoLab.

MongoDb provides several types to choose:

MONGODB-CR	        MongoDB challenge/response authentication.
MONGODB-X509 (v2.6)	MongoDB SSL certificate authentication.
PLAIN	(v2.6)      External authentication using LDAP. You can also use PLAIN for authenticating in-database users. PLAIN transmits passwords in plain text. This mechanism is available only in MongoDB Enterprise.
GSSAPI	            External authentication using Kerberos. This mechanism is available only in MongoDB Enterprise.

For detailed information on how to setup the authentification, please consult security section: http://docs.mongodb.org/manual/security/

As part of the demo we provide sample config file that can be used to start up mongoDb server instance with authentification enabled.

To start with database server from node-server/extdirect-mongodb folder run the following command in terminal.
This will consume the sample config file: mongodb.conf

```
mongod --config mongodb.conf
```

Note: Configuration files are written using YAML format.

More information on available config options and their values can be found here: http://docs.mongodb.org/manual/reference/configuration-options/

This example uses user "admin" along with password "PassWord" in admin database and user "script" with password "123456". Be sure to change them to something more secure.
Server configuration for this purpose requires some manual work. To do that launch 'mongo' command line interface and run the following commands:

```
use admin
db.createUser(
  {
    user: "admin",
    pwd: "PassWord",
    roles:
    [
      {
        role: "userAdminAnyDatabase",
        db: "admin"
      }
    ]
  }
)
use extdirectnode
db.createUser(
  {
    user: "script",
    pwd: "123456",
    roles:
    [
      {
        role: "dbOwner",
        db: "extdirectnode"
      }
    ]
  }
)
```

If you wouldl like to connect to MongoLab db you can use this config as a reference and use your own credentials.

```
{
    "hostname": "dsxxxxx.mongolab.com",
    "port": 30817,
    "db": "MongoLab-xx",
    "enableAuthorization": true,
    "authMechanism": "MONGODB-CR",
    "username": "myusernamexx",
    "password": "mypasswordxx",
    "autoReconnect" : true,
    "breakOnError": true
}
```

##Lessons learned
 * If you just installed the database, it does not have any users.
   You have to start the server with --noauth parameter
 * If you are getting this error: [initandlisten] exception in initAndListen: 98 Unable to create/open lock file: /data/db/mongod.lock errno:13 Permission denied Is a mongod instance already running?,
 Most likely you did not change permissions for /data/db folder

 * Then follow steps outlined here: http://docs.mongodb.org/manual/tutorial/add-user-administrator/

