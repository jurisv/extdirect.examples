Ext.define('DemoTouch.store.Todo',{
    extend:'Ext.data.Store',
    requires:[
        'Ext.data.proxy.Direct'
    ],
    config:{
        autoLoad: true,
        model: 'DemoTouch.model.TodoItem'
    }
});