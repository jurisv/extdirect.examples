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
                    text: 'Test call, one parameter',
                    handler: function(bt) {
                        Server.Demo.Form.testMe({test:true},
                            function(result, event) {

                                // you can grab useful info from event
                                var transaction = event.getTransaction(),
                                    status = event.status;

                                bt.up('panel').updateContent(Ext.encode(result));
                            }
                        );
                    }
                },
                {
                    text: 'Test call, empty parameter object',
                    handler: function(bt) {
                        Server.Demo.Form.testMe({},
                            function(result, event) {
                                bt.up('panel').updateContent(Ext.encode(result));
                            }
                        );
                    }
                },
                {
                    text: 'Should return "false"',
                    handler: function(bt) {
                        Server.Demo.Form.testFalse(null,
                            function(result, event) {
                                bt.up('panel').updateContent(Ext.encode(result));
                            }
                        );
                    }
                },
                {
                    text: 'Read table page',
                    handler: function(bt){
                        Server.Demo.Todo.read({
                                page: 1,
                                start: 0,
                                limit: 10
                            },
                            function(result, event) {
                                bt.up('panel').updateContent(Ext.encode(result));
                            }
                        );
                    }
                },
                {
                    text: 'Hard exception',
                    handler: function(bt) {
                        Server.Demo.Form.testException({test:true},
                            function(result, event) {
                                bt.up('panel').updateContent(Ext.encode(event.message));
                            }
                        );
                    }
                },
                {
                    text: 'Soft exception',
                    handler: function(bt){
                        Server.Demo.Todo.read({},
                            function(result, event) {
                                bt.up('panel').updateContent('No parameters specified for read operation, server returns soft error along debug info:<br> ' + Ext.encode(result));
                            }
                        );
                    }
                }
            ]
        }
    ],

    updateContent: function(content) {
        this.update({
            data: content
        });
        this.body.scroll('b', 100000, true);
    }
});