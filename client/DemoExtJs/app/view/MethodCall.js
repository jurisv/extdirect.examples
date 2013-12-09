Ext.define('DemoExtJs.view.MethodCall',{
    extend:'Ext.panel.Panel',

    xtype:'method-call',

    title:'Direct method call',

    dockedItems: [
        {
            xtype: 'toolbar',
            docked: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Test connection',
                    handler: function(bt){
                        ExtRemote.DXFormTest.testMe({test:true},
                            function(result, event){

                                // you can grab useful info from event
                                var transaction = event.getTransaction(),
                                    status = event.status;

                                Ext.Msg.alert('Response', Ext.encode(result));

                            }
                        );
                    },
                    scope:this
                },


                {
                    xtype: 'button',
                    text: 'Test exception',
                    handler: function(bt){
                        ExtRemote.DXFormTest.testException({test:true},
                            function(result, event){

                                Ext.Msg.alert('Response',event.message);

                            }
                        );
                    },
                    scope:this
                }
            ]
        }
    ]


});