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
                xtype:'demo-cookies'
            },
            {
                xtype:'grid-metadata',
                disabled: true
            },
            {
                xtype:'grid-actions',
                disabled: true
            },
            {
                xtype:'method-call',
                disabled: true
            },
            {
                xtype:'form-actions',
                disabled: true
            },
            {
                xtype:'form-upload',
                disabled: true
            },
            {
                xtype:'tree-actions',
                disabled: true
            }
        ]
    }]
});