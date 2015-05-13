Ext.define('Demo.store.Todo', {
    extend: 'Ext.data.Store',

    requires: [
        'Demo.model.TodoItem'
    ],

    model: 'Demo.model.TodoItem',

    autoLoad: false, // important to set autoLoad to false. If there is an error on the backend, Ext will still try to resolve Direct method names and crash the app.

    remoteSort: true, //enable remote filter

    remoteFilter:true, //enable remote sorting

    pageSize: 5

    //autoSync: true, // if operating on model directly this will make double POSTs!
});