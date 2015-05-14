Ext.define('Demo.view.Cookies',{
    extend: 'Ext.form.Panel',

    xtype: 'demo-cookies',

    title: 'Authentication and Cookies',

    border: false,

    bodyPadding: 5,

    dockedItems: [
        {
            xtype: 'toolbar',
            docked: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Check Authentication status',
                    handler: function(bt) {
                        Server.Auth.Login.checkLogin({},
                            function(result, event) {
                                // you can grab useful info from event
                                var transaction = event.getTransaction(),
                                    status = event.status;

                                console.log(event.result);
                                Ext.Msg.alert('Response', Ext.encode(result));
                            }
                        );
                    }
                },
                {
                    xtype: 'button',
                    text: 'Logout',
                    handler: function(bt) {
                        Server.Auth.Login.logout(bt.up('demo-cookies').getValues(),
                            function(result, event) {
                                // you can grab useful info from event
                                var transaction = event.getTransaction(),
                                    status = event.status;

                                console.log(event.result);
                                Ext.Msg.alert('Response', Ext.encode(result));

                                //Disable all but first tab

                                var tabs = bt.up('viewport').down('tabpanel').items.items;

                                if(result.auth === false) {
                                    for(var i = 1, iLen = tabs.length; i< iLen; i++){
                                        tabs[i].disable();
                                    }
                                }
                            }
                        );
                    }
                }
            ]
        }
    ],

    defaults: {
        xtype: 'textfield',
        msgTarget: 'side',
        allowBlank: false
    },
    items: [
        {
            name: 'username',
            fieldLabel: 'Username'
        },
        {
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password'
        },
        {
            xtype: 'button',
            formBind: true,
            text: 'Login',
            handler: function(bt) {
                Server.Auth.Login.login(bt.up('demo-cookies').getValues(),
                    function(result, event) {
                        // you can grab useful info from event
                        var transaction = event.getTransaction(),
                            status = event.status;

                        console.log(event.result);
                        Ext.Msg.alert('Response', Ext.encode(result));
                        //Disable all but first tab

                        var tabs = bt.up('viewport').down('tabpanel').items.items;

                        if(result.auth === true) {
                            for(var i = 1, iLen = tabs.length;  i < iLen; i++){
                                tabs[i].enable();
                            }
                        }
                    }
                );
            }
        },
        {
            xtype: 'component',
            margin: '20 0 0 0',
            html: 'Note: Please enter username and password before submitting the form, Use "demo" for username/password. <br>' +
            'Play with "Check Authentication status". It should change the response based on the actual status<br>' +
            'Application will respond to the login and enable/ disable All but Login Tab'
        }
    ]
});