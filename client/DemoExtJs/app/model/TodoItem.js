Ext.define('DemoExtJs.model.TodoItem', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id'
            ,mapping: '_id'  // IMPORTANT! Add for MongoDb backend example
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
            create:  'ExtRemote.DXTodoItem.create',
            read:    'ExtRemote.DXTodoItem.read',
            update:  'ExtRemote.DXTodoItem.update',
            destroy: 'ExtRemote.DXTodoItem.destroy'
        },
        reader: {
            type: 'json',
            root: 'data',
            messageProperty:'message' // mandatory if you want the framework to set it's content
        }
    }
});