Ext.define('DirectDemo.store.Todo',{
    extend:'Ext.data.Store',
    requires:[
        'Ext.data.proxy.Direct'
    ],
    config:{
        autoLoad: true,
        model: 'DirectDemo.model.TodoItem'
    }
});