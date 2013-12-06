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

            'jgridactions button': {
                click: this.buttonActions
            }
        });
    },

    //improves excessive query overhead
    buttonActions: function(button, e, eOpts){
        switch(button.action){
            case 'insertRecord': this.onInsertBtnClick(); break;
            case 'updateRecord': this.onUpdateBtnClick(); break;
            case 'removeRecord': this.onRemoveBtnClick(); break;
            case 'loadStore': this.laodStore(); break;
            default: break;
        }
    },

    laodStore:function(){
        this.getTodoGrid().getStore().load();
    },

    onTodoGridItemClick: function(dataview, record, item, index, e, eOpts) {
        this.getEditor().loadRecord(record);
    },

    onInsertBtnClick: function() {
        var record = Ext.create('DirectDemo.model.TodoItem', {text:'New todo action', complete:0});
        record.save({
            callback:function(records, operation, success){
                //we add to store only after successful insertion at the server-side
                if(success){
                    Ext.getStore('Todo').add(records);
                }else{
                    console.log('Failure to add record: ', arguments);
                }
            }
        });
    },

    onRemoveBtnClick: function() {
        if(this.missingSelection()){
            Ext.Msg.alert('Error', 'Please select record to remove');
        }else{
            var form = this.getEditor().getForm(),
                record = form.getRecord(),
                store = Ext.getStore('Todo');
            this.getTodoGrid().getSelectionModel().deselect(record);

            store.remove(record);

            record.destroy({
                callback:function(records, operation){
                    var success = operation.wasSuccessful();

                    if(success){
                        form.reset();
                        console.log('Sucessfully removed record: ', arguments);
                    }else{
                        store.insert(record.index, record);
                        console.log('Failure to remove record: ', arguments);
                        Ext.Msg.alert('Server side Error', 'Unable to remove the record');
                    }
                }
            });
        }
    },

    onUpdateBtnClick: function() {
        //prevent errors if no records selected
        if(this.missingSelection()){
            return false;
        }

        var form = this.getEditor().getForm();

        if (form.isValid()) {
            var record = form.getRecord();
            form.updateRecord(record);

            record.save({
                success: function(record, operation) {
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
        }
    },

    missingSelection: function(){
        return this.getTodoGrid().getSelectionModel().getSelection().length === 0;
    }
});