Ext.define('Demo.store.Tree', {
    extend: 'Ext.data.TreeStore',

    root: {
        expanded: false // we have to set root node to false. This will ensure that store is not loaded during construction time.
    },

    proxy: {
        type: 'direct',
        directFn: 'Server.Demo.Tree.getTree'
    }
});