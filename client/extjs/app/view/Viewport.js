Ext.define('Demo.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.tab.Panel'
    ],

    layout: 'border',

    items: [{
        region: 'center',
        xtype: 'tabpanel',
        items: [
            {
                xtype:'grid-actions'
            },
            {
                xtype:'method-call'
            },
            {
                xtype:'form-actions'
            },
            {
                xtype:'form-upload'
            },
            {
                xtype:'tree-actions'
            },
            {
                xtype:'demo-cookies'
            }
        ]
    }]
});