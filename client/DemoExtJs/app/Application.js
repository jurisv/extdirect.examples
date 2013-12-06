Ext.define('DemoExtJs.Application', {
    name: 'DemoExtJs',

    extend: 'Ext.app.Application',

    views: [
        'MethodCall',
        'FormActions',
        'GridActions',
        'FormUpload'
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