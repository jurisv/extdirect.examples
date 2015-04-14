Ext.define('DemoExtJs.Application', {
    name: 'DemoExtJs',

    requires:[
        'DemoExtJs.DirectAPI'
    ],

    extend: 'Ext.app.Application',

    views: [
        'MethodCall',
        'FormActions',
        'GridActions',
        'FormUpload',
        'TreeActions',
        'Cookies'
    ],

    controllers: [
        'Main'
    ],

    models:[
        'TodoItem'
    ],

    stores: [
        'Todo',
        'Tree'
    ]
});