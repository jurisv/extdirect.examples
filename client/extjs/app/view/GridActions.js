Ext.define('Demo.view.GridActions',{
    extend:'Ext.container.Container',

    xtype:'grid-actions',

    title: 'Grid CRUD operations',

    layout: 'border',

    style: 'padding:5px',

    items: [
        {
            xtype: 'gridpanel',
            region: 'center',
            itemId: 'todoGrid',
            store: 'Todo',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items:[
                    {
                        xtype: 'button',
                        action: 'insertRecord',
                        icon: 'resources/assets/plus-circle.png',
                        text: 'Insert blank record'
                    },
                    {
                        text: 'Load data',
                        icon: 'resources/assets/arrow-circle-double-135.png',
                        action: 'loadStore'
                    },
                    '->',
                    {
                        xtype: 'textfield',
                        itemId: 'filter',
                        triggers: {
                            clear: {
                                cls: 'x-form-clear-trigger',
                                weight: 1, // controls display order
                                hideOnReadOnly: false, //always visible
                                handler: function(trigger) {
                                    trigger.reset();
                                    this.fireEvent('reset', trigger);
                                }
                            }
                        },
                        emptyText: 'Filter'
                    },{
                        xtype: 'button',
                        action: 'filterStore',
                        text: 'Filter'
                    }
                ]
            },{
                xtype: 'pagingtoolbar',
                store: 'Todo',   // same store GridPanel is using
                dock: 'bottom',
                displayInfo: true
            }],

            columns: [
                {
                    dataIndex: 'id',
                    text: 'Id',
                    width: 170
                },
                {
                    flex:1,
                    dataIndex: 'text',
                    text: 'Text'
                },
                {
                    dataIndex: 'complete',
                    renderer: function(value){return value ? 'Done' : 'Not yet'},
                    text: 'Complete'
                },{
                    xtype: 'actioncolumn',
                    width: 20,
                    items: [{
                        icon: 'resources/assets/information.png',
                        tooltip: 'Click for more info',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            Ext.Msg.alert('Item description', 'Task: ' + rec.get('text'));
                        }
                    }]
                }
            ]
        },
        {
            xtype: 'form',
            region: 'east',
            split: true,
            disabled: true,
            width: 350,
            itemId: 'todoForm',
            bodyPadding: 10,
            title: 'Edit details',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'textfield',
                    disabled: true,
                    fieldLabel: 'Id',
                    name: 'id'
                },
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    msgTarget: 'side',
                    fieldLabel: 'Text',
                    name: 'text'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Complete',
                    name: 'complete',
                    boxLabel: 'Yes'
                }
            ],

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            action: 'removeRecord',
                            icon: 'resources/assets/minus-circle.png',
                            text: 'Remove selected'
                        },
                        '->',
                        {
                            xtype: 'button',
                            action: 'updateRecord',
                            icon: 'resources/assets/pencil.png',
                            text: 'Update'
                        }
                    ]
                }
            ]
        }
    ]
});