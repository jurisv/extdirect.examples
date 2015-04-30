Ext.define('TaskList.DirectAPI', {
    requires: ['Ext.direct.*', 'Ext.Ajax']
}, function() {
    Ext.Ajax.request({
        url: "http://localhost:3000/directapi",
        async: false,
        success: function(xhr) {
            Ext.globalEval(xhr.responseText);
        },
        failure: function(xhr) {
            throw "Direct API load failed with error code " + xhr.status + ": " + xhr.statusText;
        }
    });
    Ext.direct.Manager.addProvider(Server.API);
});