Ext.define('Demo.view.FormActions',{
    extend: 'Ext.form.Panel',

    xtype: 'form-actions',

    title: 'Form Actions',

    requires: [
        'Ext.form.action.DirectLoad',
        'Ext.form.action.DirectSubmit'
    ],

    bodyPadding: 5,

    api: {
        load: 'Server.Demo.Form.load',
        submit: 'Server.Demo.Form.submit'
    },

    paramOrder: ['uid'],
    defaults: {
        xtype: 'textfield',
        msgTarget: 'side',
        allowBlank: false
    },
    items: [
        {
            fieldLabel: 'First name',
            name: 'firstname'
        },
        {
            fieldLabel: 'Last nanme',
            name: 'lastname'
        },
        {
            fieldLabel: 'Email',
            name: 'email'
        }
    ],
    tbar: [
        {
            text: 'Load',
            handler: function(btn) {
                btn.up('form').getForm().load({uid:123});
            }
        },
        {
            text: 'Save',
            handler: function(btn) {
                btn.up('form').getForm().submit({
                    clientValidation: true,
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.msg);
                    },
                    failure: function(form, action) {
                        switch (action.failureType) {
                            case Ext.form.action.Action.CLIENT_INVALID:
                                Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                                break;
                            case Ext.form.action.Action.CONNECT_FAILURE:
                                Ext.Msg.alert('Failure', 'Ajax communication failed');
                                break;
                            case Ext.form.action.Action.SERVER_INVALID:
                                Ext.Msg.alert('Failure', action.result.msg);
                        }
                    }
                });
            }
        }
    ]
});