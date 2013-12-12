Ext.define('DemoExtJs.store.Tree', {
    extend: 'Ext.data.TreeStore',

    root: {
        expanded: true
    },

    proxy: {
        type: 'direct',
        directFn: 'ExtRemote.DXTree.getTree'
    }
});