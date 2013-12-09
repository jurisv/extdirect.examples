Ext.define('DemoExtJs.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    layout: {
        type: 'border'
    },

    items: [{
        region: 'center',
        xtype: 'tabpanel',
        items:[
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
            }
        ]
    }]
});