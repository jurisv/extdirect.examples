Ext.define('Demo.view.Metadata', {

    extend:'Ext.grid.Panel',

    xtype: 'grid-metadata',

    title: 'Grid with Metadata',

    store: {
        fields: ['name', 'revenue'],
        remoteSort: false,
        autoLoad: false,
        sorters: [{
            property: 'name',
            direction: 'ASC'
        }],
        proxy: {
            type: 'direct',
            directFn: 'Server.MultiTable.read',
            metadata: {
                table: 'customers'
            },
            //We add reader here.
            reader: {
                type: 'json',
                rootProperty: 'data',
                messageProperty: 'message' // mandatory if you want the framework to set message property content
            }
        }
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items:[
            {
                xtype: 'combobox',
                fieldLabel: 'Choose table',
                queryMode: 'local',
                displayField: 'desc',
                valueField: 'table',
                forceSelection: true,
                editable: false,
                value: 'customers',
                store: {
                    fields: ['table', 'desc'],
                    data: [
                        { table: 'customers', desc: 'Existing customers' },
                        { table: 'leads',     desc: 'Sales leads' }
                    ]
                },
                listeners: {
                    change: function(combo, newValue){
                        var store = combo.up('grid-metadata').getStore();

                        store.getProxy().setMetadata({
                            table: newValue
                        });

                        store.load();
                    }
                }
            },
            {
                text: 'Load data',
                icon: 'resources/assets/arrow-circle-double-135.png',
                handler: function(bt){
                    bt.up('grid-metadata').getStore().load();
                }
            }
        ]
    }],

    columns: [{
        dataIndex: 'name',
        flex: 1,
        text: 'Name'
    }, {
        dataIndex: 'revenue',
        align: 'right',
        width: 140,
        text: 'Annual revenue',
        renderer: Ext.util.Format.usMoney
    }]
});