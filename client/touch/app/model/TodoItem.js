Ext.define('Demo.model.TodoItem', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'id',

        fields: [
            {
                name: 'id'
                // ,mapping: '_id' // IMPORTANT! Add for MongoDB backend example
            },
            {
                name: 'text',
                type: 'string'
            },
            {
                name: 'complete',
                type: 'boolean'
            }
        ],

        sorters: [
            {
                property : "id",
                direction: "DESC"
            }
        ],

        proxy: {
            //Set proxy type
            type: 'direct',

            //Define direct method. In Touch example we use only reading.
            //ExtJS counterpart have more sophisticated CRUD Master - Detail example.

            directFn: 'Server.Demo.Todo.read',

            reader: {
                type: 'json',
                rootProperty: 'data',
                messageProperty: 'message'
            }
        }
    }
});