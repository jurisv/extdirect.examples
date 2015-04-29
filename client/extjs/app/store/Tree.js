Ext.define('Demo.store.Tree', {
    extend: 'Ext.data.TreeStore',

    root: {
        expanded: true
    },

    proxy: {
        type: 'direct',
        directFn: 'Server.Demo.Tree.getTree'
    }
});