Ext.define('DirectDemo.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
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
                title: 'Todo List',
                iconCls: 'team',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Todo List'
                    }
                ]
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
