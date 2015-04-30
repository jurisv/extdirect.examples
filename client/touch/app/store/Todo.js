Ext.define('Demo.store.Todo', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Direct'
    ],

    config: {
        autoLoad: true,
        model: 'Demo.model.TodoItem'
    }
});