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
    * db-config.json - config variables for the database
    * db-config.json - config variables for MySQL server
    * server.js - Main server file
    * server-db.js - Database part implementation. If you want to implement different type of database, make any changes to this file
    * data.sql - initial dataset


###MongoDb quickstart

Step 1: Download : http://www.mongodb.org/downloads

Step 2: Configure and start server

    MAC: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/
    Linux: http://docs.mongodb.org/manual/administration/install-on-linux/
    Windows: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/

Step 3: Import initial sample data from todoitem.json (optional)
    From terminal:

    ```sh
    mongoimport --db extdirectnode --collection todoitem --jsonArray --file todoitem.json
    ```

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