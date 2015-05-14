//Use this override to enable CORS with credentials.
Ext.define('Demo.override.Connection', {
    override: 'Ext.data.Connection',
    config:{
        withCredentials: true,
        cors: true
    }
});