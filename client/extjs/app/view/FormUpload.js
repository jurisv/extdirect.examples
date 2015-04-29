Ext.define('Demo.view.FormUpload', {
    extend: 'Ext.form.Panel',

    xtype: 'form-upload',

    requires: [
        'Ext.form.action.DirectLoad',
        'Ext.form.action.DirectSubmit'
    ],

    title: 'Form File Upload',

    bodyPadding: 5,

    api:{
        submit: 'Server.Demo.Form.filesubmit'
    },

    paramOrder: ['uid'],

    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Description',
            name: 'description'
        },
        {
            xtype: 'filefield',
            name: 'photo',
            fieldLabel: 'Photo',
            labelWidth: 50,
            msgTarget: 'side',
            allowBlank: true,
            anchor: '40%',
            buttonText: 'Select Photo...'
        }
    ],
    dockedItems:[
        {
            xtype: 'box',
            dock: 'top',
            height: 25,
            padding: 5,
            html: 'Important: Cross domain file upload is limited. There is no direct way to parse the response! For this example to work server and client code should be hosted on the same domain including port!'
        }
    ],
    tbar:[
        {
            text:'Upload..',
            handler:function(btn) {

                btn.up('form').getForm().submit({
                        waitMsg: 'Uploading your photo...',

                        callback: function(fp, o) {

                        },

                        success: function(fp, o) {
                            Ext.Msg.alert('Success', 'Your photo "' + o.result.name +
                                '" has been uploaded.<br> File size:' + o.result.size + ' bytes.');
                        },

                        failure: function(form, action) {
                            console.log(arguments);
                            Ext.MessageBox.show({
                                title: 'EXCEPTION',
                                msg: 'Error uploading file',
                                icon: Ext.MessageBox.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    }
                );
            }
        }
    ]
});
