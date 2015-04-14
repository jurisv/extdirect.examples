### Server

Server folder provides two different implementations, one for mysql database and another for MongoDb

### Prerequisites 
node.js server of version 0.12.2+ 

Dependencies:
* Express 4.x
* ext.direct 2.x

### How to run the examples

* Download repo content
* Pick server version depending on which database you would like to run
* Adjust db-config.json to match your database server
* Create initial 'test' database named `extdirectnode` and import the sample data
* Run server `node server.js`