/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

/*
 Require Ext.Direct classes
 */
Ext.require([
    'Ext.direct.*'
]);

/*
 Add provider. Name must match settings on serverside
 */
Ext.onReady(function(){
    Ext.direct.Manager.addProvider(ExtRemote.REMOTING_API);
});

Ext.application({
    name: 'DemoExtJs',

    extend: 'DemoExtJs.Application',

    autoCreateViewport: true
});