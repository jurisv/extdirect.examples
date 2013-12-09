Ext.define('DemoTouch.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'Ext.plugin.PullRefresh'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Todo List',
                iconCls: 'team',
                xtype:'list',
                items:[{
                    xtype:'titlebar',
                    title: 'Todo List',
                    docked:'top',
                    items:[
                        {
                            text:'Reload',
                            handler: function(){
                                this.up('list').getStore().load();
                            }
                        }
                    ]
                }
                ],
                plugins: [
                    {
                        xclass: 'Ext.plugin.PullRefresh',
                        pullText: 'Pull down for more new Items'
                    }
                ],
                store:'Todo',
                itemTpl: '{id} : {text}'


            },
            {
                title: 'Form',
                iconCls: 'bookmarks',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'User Form'
                }
            },
            {
                title: 'Upload',
                iconCls: 'favorites',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Upload file'
                    }
                ]
            }
        ]
    }
});