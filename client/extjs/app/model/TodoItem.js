Ext.define('Demo.model.TodoItem', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id'
            //,mapping: '_id'  // IMPORTANT! Uncomment for MongoDB backend example
        },
        {
            name: 'text'
        },
        {
            name: 'complete',
            type: 'boolean'
        }
    ],

    proxy: {
        type: 'direct',
        api: {
            create:  'Server.Demo.Todo.create',
            read:    'Server.Demo.Todo.read',
            update:  'Server.Demo.Todo.update',
            destroy: 'Server.Demo.Todo.destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'message' // mandatory if you want the framework to set message property content
        }
    }
});