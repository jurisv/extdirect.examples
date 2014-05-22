Ext.define('DemoExtJs.view.GridActions',{
    extend:'Ext.container.Container',

    xtype:'grid-actions',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.form.field.Number',
        'Ext.toolbar.Paging',
        'Ext.form.field.Checkbox',
        'Ext.grid.column.Action'
    ],

    title: 'Grid CRUD operations',
    layout: 'border',
    style:'padding:5px',
    items: [
        {
            xtype: 'gridpanel',
            region:'center',
            itemId: 'todoGrid',
            store: 'Todo',
            dockedItems: [{
                xtype:'toolbar',
                dock:'top',
                items:[
                    {
                        xtype: 'button',
                        action: 'insertRecord',
                        icon:'resources/assets/plus-circle.png',
                        text: 'Insert blank record'
                    },
                    {
                        text:'Reload data',
                        icon:'resources/assets/arrow-circle-double-135.png',
                        action:'loadStore'
                    },'->',{
                        xtype:'trigger',
                        triggerCls: 'x-form-clear-trigger',
                        emptyText:'Filter',
                        onTriggerClick: function(trigger) {
                            this.reset();
                            this.fireEvent('filter-reset', trigger);
                        }
                    },{
                        xtype:'button',
                        action:'filterStore',
                        text:'Filter'
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
                    renderer:function(value){return value ? 'Done' : 'Not yet'},
                    text: 'Complete'
                },{
                    xtype:'actioncolumn',
                    width:20,
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
            region:'east',
            split:true,
            disabled:true,
            width: 350,
            itemId: 'todoForm',
            bodyPadding: 10,
            title: 'Edit details',
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    disabled: true,
                    fieldLabel: 'Id',
                    name: 'id'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget:'side',
                    fieldLabel: 'Text',
                    name: 'text'
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: 'Complete',
                    name: 'complete',
                    boxLabel: 'Yes'
                }
            ],
            dockedItems:[
                {
                    xtype:'toolbar',
                    dock: 'top',
                    items:[
                        {
                            xtype: 'button',
                            action: 'removeRecord',
                            icon:'resources/assets/minus-circle.png',
                            text: 'Remove selected'
                        }, '->',{
                            xtype: 'button',
                            action: 'updateRecord',
                            icon:'resources/assets/pencil.png',
                            text: 'Update'
                        }
                    ]


                }

            ]
        }
    ]
});