Ext.define('DemoExtJs.store.Todo', {
    extend: 'Ext.data.Store',

    requires: [
        'DemoExtJs.model.TodoItem'
    ],

    autoLoad: true,

    remoteSort:true, //enable remote filter

    remoteFilter:true, //enable remote sorting

    pageSize: 5,

    //autoSync: true, // if operating on model directly this will make double POSTs!

    model: 'DemoExtJs.model.TodoItem',

    storeId: 'Todo' // If store Id matches it's class name, may be skipped.
});