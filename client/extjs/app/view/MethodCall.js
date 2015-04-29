Ext.define('Demo.view.MethodCall',{
    extend: 'Ext.form.Panel',

    xtype: 'method-call',

    title: 'Direct method calls, exceptions',

    tplWriteMode: 'append',

    tpl: '<p>{data}</p>',

    autoScroll: true,

    bodyPadding: 5,

    dockedItems: [
        {
            xtype: 'toolbar',
            docked: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Test call, one parameter',
                    handler: function(bt) {
                        var me = bt.up('panel');
                        Server.Demo.Form.testMe({test:true},
                            function(result, event) {

                                // you can grab useful info from event
                                var transaction = event.getTransaction(),
                                    status = event.status;

                                me.updateContent(Ext.encode(result));
                            }
                        );
                    }
                },
                {
                    xtype: 'button',
                    text: 'Test call, empty parameter object',
                    handler: function(bt) {
                        var me = bt.up('panel');
                        Server.Demo.Form.testMe({},
                            function(result, event) {
                                me.updateContent(Ext.encode(result));
                            }
                        );
                    }
                },
                {
                    xtype: 'button',
                    text: 'Read table page',
                    handler: function(bt){
                        var me = bt.up('panel');
                        Server.Demo.Todo.read({
                                page: 1,
                                start: 0,
                                limit: 10
                            },
                            function(result, event) {
                                me.updateContent(Ext.encode(result));
                            }
                        );
                    }
                },
                {
                    xtype: 'button',
                    text: 'Hard exception',
                    handler: function(bt) {
                        var me = bt.up('panel');
                        Server.Demo.Form.testException({test:true},
                            function(result, event) {
                                me.updateContent(Ext.encode(event.message));
                            }
                        );
                    }
                },
                {
                    xtype: 'button',
                    text: 'Soft exception',
                    handler: function(bt){
                        var me = bt.up('panel');
                        Server.Demo.Todo.read({},
                            function(result, event) {
                                me.updateContent('No parameters specified for read operation, server returns soft error along debug info:<br> ' + Ext.encode(result));
                            }
                        );
                    }
                }
            ]
        }
    ],

    updateContent: function(content) {
        var me = this;
        me.update({
            data: content
        });
        me.body.scroll('b', 100000, true);
    }
});