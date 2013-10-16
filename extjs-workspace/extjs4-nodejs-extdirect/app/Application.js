Ext.define('DirectDemo.Application', {
    name: 'DirectDemo',

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
