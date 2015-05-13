/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Demo.Application', {
    extend: 'Ext.app.Application',

    name: 'Demo',

    requires:[
        'Demo.DirectAPI'
    ],

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
    ],

    launch: function(){
        if(Demo.DirectError){
             Ext.Msg.alert('Error', Demo.DirectError.message);
        } else {
            //Note that we have removed autoCreateViewport property from app.js and instantiate it here.
            //This allows us to block application execution if Direct backend is not available to serve the requests.
            Ext.create('Demo.view.Viewport');
        }
    }
});