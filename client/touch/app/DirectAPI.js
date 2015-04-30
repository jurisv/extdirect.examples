Ext.define('Demo.DirectAPI', {
    /*
     Require Ext.Direct classes
     */
    requires: ['Ext.direct.*']
}, function() {
    var Loader = Ext.Loader,
        wasLoading = Loader.isLoading;

    //Loading API
    Loader.loadScriptFile('http://localhost:3000/directapi', Ext.emptyFn, Ext.emptyFn, null, true);
    Loader.isLoading = wasLoading;
    /*
     Add provider. Name must match settings on serverside
     */
    Ext.direct.Manager.addProvider(Server.API);
});