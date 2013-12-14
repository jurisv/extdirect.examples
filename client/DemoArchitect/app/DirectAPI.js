Ext.define('DemoArchitect.DirectAPI', {
    requires: ['Ext.direct.*']
}, function() {
    var Loader = Ext.Loader,
        wasLoading = Loader.isLoading;
    Loader.loadScriptFile('http://localhost:3000/directapi', Ext.emptyFn, Ext.emptyFn, null, true);
    Loader.isLoading = wasLoading;
    Ext.direct.Manager.addProvider(ExtRemote.REMOTING_API);
});