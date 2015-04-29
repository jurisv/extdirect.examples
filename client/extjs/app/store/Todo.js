Ext.define('Demo.store.Todo', {
    extend: 'Ext.data.Store',

    requires: [
        'Demo.model.TodoItem'
    ],

    model: 'Demo.model.TodoItem',

    autoLoad: true,

    remoteSort: true, //enable remote filter

    remoteFilter:true, //enable remote sorting

    pageSize: 5

    //autoSync: true, // if operating on model directly this will make double POSTs!
});