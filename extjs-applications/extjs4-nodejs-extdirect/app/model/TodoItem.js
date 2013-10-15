Ext.define('DirectDemo.model.TodoItem', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'int'
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
            messageProperty:'message'
        }
    }
});