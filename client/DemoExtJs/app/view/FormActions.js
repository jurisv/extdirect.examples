Ext.define('DemoExtJs.view.FormActions',{
    extend:'Ext.form.Panel',

    xtype:'form-actions',

    title:'Form Actions',

    requires:[
        'Ext.form.action.DirectLoad',
        'Ext.form.action.DirectSubmit'
    ],

    bodyPadding:5,

    api:{
        load: 'ExtRemote.DXFormTest.load',
        submit:'ExtRemote.DXFormTest.submit'
    },

    paramOrder: ['uid'],

    items:[
        {
            xtype:'textfield',
            fieldLabel:'First name',
            name:'firstname'
        },
        {
            xtype:'textfield',
            fieldLabel:'Last nanme',
            name:'lastname'
        },
        {
            xtype:'textfield',
            fieldLabel:'Email',
            name:'email'
        }
    ],
    tbar:[
        {
            text:'Load',
            handler:function(btn){
                btn.up('form').getForm().load({uid:123});
            }
        },
        {
            text:'Save',
            handler:function(btn){
                btn.up('form').getForm().submit();
            }
        }
    ]
});