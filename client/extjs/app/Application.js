/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Demo.Application', {
    extend: 'Ext.app.Application',

    name: 'Demo',

    requires:[
        'Ext.direct.*', 'Ext.data.proxy.Direct'
    ],
    
    views: [
        'MethodCall',
        'FormActions',
        'GridActions',
        'FormUpload',
        'TreeActions',
        'Cookies',
        'Metadata'
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

        var ns = Server.API;

        /*
         Add provider. Name must match settings on serverside
         */

        //Custom implementation. Works only with node backend and extdirect connector v2
        //This feature is part ApiProcessor implementation
        if(ns){
            // Check for unexpected problems
            // Node backend will set error object
            if(ns.error){
                Ext.Msg.alert('Error', ns.error.message);
            } else {
                Ext.direct.Manager.addProvider(ns);

                var viewport = Ext.create('Demo.view.Viewport');

                //Let's check if we are logged in

                Server.Auth.Login.checkLogin({},
                    function(result, event) {
                        var tabs = viewport.down('tabpanel').items.items;

                        if(result.auth) {
                            // enable other tabs
                            Ext.each(tabs, function(cmp){
                                cmp.enable();
                            });
                        }
                    }
                );

            }
        }

    }
});