Ext.define('DirectDemo.store.Todo', {
    extend: 'Ext.data.Store',

    requires: [
        'DirectDemo.model.TodoItem'
    ],

    autoLoad: false,

    pageSize: 5,

    //autoSync: true, // if operating on model directly this will make double POSTs!

    model: 'DirectDemo.model.TodoItem',

    storeId: 'Todo' // If store Id matches it's class name, may be skipped.
});