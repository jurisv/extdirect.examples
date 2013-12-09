Ext.define('DemoExtJs.view.Cookies',{
    extend: 'Ext.form.Panel',

    xtype: 'demo-cookies',

    title: 'Cookies',

    border: false,

    bodyPadding: 5,

    dockedItems: [
        {
            xtype: 'toolbar',
            docked: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Authentificate using credentials below',
                    handler: function(bt){
                        ExtRemote.DXLogin.authenticate(bt.up('demo-cookies').getValues(),
                            function(result, event){

                                // you can grab useful info from event
                                var transaction = event.getTransaction(),
                                    status = event.status;

                                console.log(event.result);
                                Ext.Msg.alert('Response', Ext.encode(result));

                            }
                        );
                    },
                    scope:this
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'Username'
        },
        {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password'
        }

    ]


});