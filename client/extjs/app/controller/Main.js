Ext.define('Demo.controller.Main', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'editor',
            selector: 'grid-actions #todoForm'
        },
        {
            ref:'todoGrid',
            selector:'grid-actions #todoGrid'
        }
    ],

    init: function(application) {
        this.control({
            'grid-actions #todoGrid': {
                itemclick: this.onTodoGridItemClick
            },

            'grid-actions button': { //listening for all buttons on grid-actions here, then narrow down to particular button inside actual method
                click: this.buttonActions
            },

            'grid-actions #todoGrid toolbar #filter': {
                reset: function() { //not the best practice, please avoid if possible! this only shows that you can use dashes for event names.
                    //we can define logic also here
                    Ext.getStore('Todo').clearFilter();
                }
            }
        });
    },

    //improves excessive query overhead
    buttonActions: function(button, e, eOpts) {
        var me = this;

        switch(button.action){
            case 'insertRecord': me.onInsertBtnClick(); break;
            case 'updateRecord': me.onUpdateBtnClick(); break;
            case 'removeRecord': me.onRemoveBtnClick(); break;
            case 'loadStore': me.loadStore(); break;
            case 'filterStore': me.filterStore(); break;
            default: break;
        }
    },

    loadStore:function() {
        this.getTodoGrid().getStore().reload();
    },

    filterStore: function() {
        var field = this.getTodoGrid().down('toolbar #filter'),
            value = field.getValue(),
            store = Ext.getStore('Todo');

        if(value) {
            store.clearFilter(true);
            store.filter('text', value);  // filter on 'text' field
        }
    },

    onTodoGridItemClick: function(dataview, record, item, index, e, eOpts) {
        var form = this.getEditor();
        form.getForm().loadRecord(record);
        form.enable();
    },

    onInsertBtnClick: function() {
        var store = Ext.getStore('Todo');
        var record = Ext.create('Demo.model.TodoItem', {
            text: 'New todo action ' + +(store.getCount() + 1),
            complete: 0
        });
        record.save({
            callback:function(records, operation, success) {
                //we add to store only after successful insertion at the server-side
                if(success) {
                    Ext.getStore('Todo').add(records);
                } else {
                    console.log('Failure to add record: ', arguments);
                }
            }
        });
    },

    onRemoveBtnClick: function() {
        var me = this;
        if(this.missingSelection()) {
            Ext.Msg.alert('Error', 'Please select record to remove');
        } else {
            var form = me.getEditor().getForm(),
                record = form.getRecord(),
                store = Ext.getStore('Todo');

            me.getTodoGrid().getSelectionModel().deselect(record);

            store.remove(record);

            record.erase({
                callback: function(records, operation) {
                    var success = operation.wasSuccessful();
                    form.reset();
                    me.getEditor().disable();
                    if(success) {
                        console.log('Sucessfully removed record: ', arguments);
                    } else {
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
        if(this.missingSelection()) {
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

    missingSelection: function() {
        return this.getTodoGrid().getSelectionModel().getSelection().length === 0;
    }
});
