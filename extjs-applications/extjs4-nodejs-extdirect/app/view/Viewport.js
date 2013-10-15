Ext.define('DirectDemo.view.Viewport', {
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
                xtype:'jgridactions'
            },
            {
                xtype:'jmethodcall'
            },
            {
                xtype:'jformactions'
            },
            {
                xtype:'jformaupload'
            }
        ]
    }]
});