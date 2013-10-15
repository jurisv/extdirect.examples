Ext.define('DirectDemo.controller.Main', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'editor',
            selector: 'jgridactions #todoForm'
        },
        {
            ref:'todoGrid',
            selector:'jgridactions #todoGrid'
        }
    ],

    init: function(application) {
        this.control({
            "jgridactions #todoGrid": {
                itemclick: this.onTodoGridItemClick
            },

            'jgridactions button[action=insertRecord]': {
                click: this.onInsertBtnClick
            },

            'jgridactions button[action=updateRecord]': {
                click: this.onUpdateBtnClick
            },

            'jgridactions button[action=removeRecord]': {
                click: this.onRemoveBtnClick
            },

            'jgridactions button[action=loadStore]':{
                click: this.laodStore
            }
        });
    },

    laodStore:function(){
        this.getTodoGrid().getStore().load();
    },

    onTodoGridItemClick: function(dataview, record, item, index, e, eOpts) {
        this.getEditor().loadRecord(record);
    },

    onInsertBtnClick: function(button, e, eOpts) {
//TODO: implement
    },

    onRemoveBtnClick: function(button, e, eOpts) {
//TODO: implement
    },

    onUpdateBtnClick: function(button, e, eOpts) {
        //prevent errors if no records selected
        if(this.getTodoGrid().getSelectionModel().getSelection().length===0){
            return false;
        }
        var form = this.getEditor().getForm();

        if (form.isValid()) {
            var record = form.getRecord();
            form.updateRecord(record);

            record.save({
                success: function(record, operation) {
                    //var id = record.getId(),
                    //  store = record.store;
                    record.commit(); // ##Juris :: Commit record in the store
                    console.log('success', record, operation);
                    // update form from computed remote record
                    form.loadRecord(record);
                },
                failure: function(record, operation) {
                    var exception = operation.getError();
                    if (exception && exception.errors) form.markInvalid(exception.errors);
                    console.log('failure', record, operation, exception);
                },
                scope: this
            });
        } else {
            //me.formShowValidationErrors(form);
        }
    }

});
