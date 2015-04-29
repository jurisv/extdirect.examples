Ext.define('Demo.DirectAPI', {
    /*
     Require Ext.Direct classes
     */
    requires: ['Ext.direct.*']
}, function() {
    var Loader = Ext.Loader;

    //Loading API
    Loader.loadScriptsSync(['http://localhost:3000/directapi']);

    /*
     Add provider. Name must match settings on serverside
     */
    Ext.direct.Manager.addProvider(Server.API);
});