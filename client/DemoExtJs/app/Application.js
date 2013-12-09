Ext.define('DemoExtJs.Application', {
    name: 'DemoExtJs',

    extend: 'Ext.app.Application',

    views: [
        'MethodCall',
        'FormActions',
        'GridActions',
        'FormUpload',
        'TreeActions'
    ],

    controllers: [
        'Main'
    ],

    models:[
        'TodoItem'
    ],

    stores: [
        'Todo'
    ]
});