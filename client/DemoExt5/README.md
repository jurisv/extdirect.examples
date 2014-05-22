#### Sample application that shows different scenarios when connecting ExtJs 5.0+ application to backend via Ext.Direct:

  * Direct method call
  
  * Form load / submit

  * Grid CRUD operations

  * Form file upload

  * Tree root / child dynamic load

  * Cookie (Session data)

Note: Adjust your server path in file DirectAPI.js to match deployment environment.
By default it's pointing to 'http://localhost:3000/directapi'

Important! If you are using mongodb as your backend, you have to add mapping for id field!

Example:

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