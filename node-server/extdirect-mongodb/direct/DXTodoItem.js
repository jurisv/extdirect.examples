var table = 'todoitem';

var async = require('async');

var DXTodoItem  = {
    create: function(create_params, create_callback) {
        mongoDb.collection(table, function collection_calledback(err, collection) {
            if (err) throw err;
            var todoItem = create_params;
            // MongoDB must have ID in _id
            todoItem._id = todoItem.id;
            delete todoItem.id;
            // note: there are several different ways one could implement IDs, this is one possible way
            var askedForId = todoItem._id;
            var needsRandomId = !todoItem._id;
            // todo maybe: if !askedForId then wrap randomization and insert into async.doWhilst
            if (needsRandomId) {
                // todo probably: pick better random library with larger range of numbers
                // note: V8 JavaScript engine may have weak randomness http://stackoverflow.com/questions/9550796
                todoItem._id = Math.floor(Math.random() * 899999999.999 + 100000000);
            }
            todoItem._id = todoItem._id.toString();
            collection.insert([todoItem], function insert_calledback(err, inserted_docs) {
                if (err && err.name == "MongoError" && err.code == 11000) {
                    console.log("TodoItem exists already, cannot insert.");
                    throw err;
                } else if (err) {
                    console.log("Error on insert.");
                    throw err;
                }
                var inserted_doc = inserted_docs[0];
                // MongoDB has ID in _id, also toString in case e.g. ObjectID
                inserted_doc.id = inserted_doc._id.toString();
                delete inserted_doc._id;
                create_callback({
                    success: true,
                    data: inserted_doc
                });
            });
        });
    },

    //callback as last argument is mandatory
    read: function(read_params, read_callback){
        mongoDb.collection(table, function collection_calledback(err, collection) {
            async.auto({
                find: function find(async_auto_callback) {
                    var options = {};
                    if (read_params.limit) {
                        options.skip = read_params.start;
                        options.limit = read_params.limit;
                    }
                    if (read_params.sort) {
                        var read_params_sorts = read_params.sort;
                        var sorts = [];
                        for (var i = 0, len = read_params_sorts.length; i < len; i++) {
                            var read_params_sort = read_params_sorts[i];
                            if (read_params_sort.property == "id") {
                                // MongoDB has ID in _id
                                read_params_sort.property = "_id";
                            }
                            var sort = [read_params_sort.property];
                            if (read_params_sort.direction) {
                                sort.push(read_params_sort.direction);
                            }
                            sorts.push(sort);
                        }
                        options.sort = sorts;
                    }
                    collection.find({}, options).toArray(function toArray_calledback(err, found_docs) {
                        if (err) { async_auto_callback(err); return; }
                        for (var i = 0, len = found_docs.length; i < len; i++) {
                            var found_doc = found_docs[i];
                            // MongoDB has ID in _id, also toString in case e.g. ObjectID
                            found_doc.id = found_doc._id.toString();
                            delete found_doc._id;
                        }
                        async_auto_callback(null, found_docs);
                    });
                },
                count: function count(async_auto_callback) {
                    collection.count(function count_calledback(err, counted) {
                        if (err) { async_auto_callback(err); return; }
                        async_auto_callback(null, counted);
                    });
                },
            },
            function async_auto_callback(err, results_so_far) {
                if (err) throw err;
                read_callback({
                    success: true,
                    data: results_so_far.find,
                    total: results_so_far.count
                });
            });
        });
    },

    update: function(update_params, update_callback){
        mongoDb.collection(table, function collection_calledback(err, collection) {
            update_params._id = update_params.id.toString();
            delete update_params.id;
            collection.update({_id: update_params._id}, update_params, function update_calledback(err, number_updated) {
                if (err) throw err;
                update_callback({
                    success: number_updated == 1
                });
            });
        });
    },

    destroy: function(destroy_params, destroy_callback){
        mongoDb.collection(table, function collection_calledback(err, collection) {
            // MongoDB has ID in _id, also toString in case e.g. ObjectID
            destroy_params._id = destroy_params.id.toString();
            delete destroy_params.id;
            collection.remove({_id: destroy_params._id}, function remove_calledback(err, number_removed) {
                if (err) throw err;
                destroy_callback({
                    success: number_removed == 1,
                    id: destroy_params._id
                });
            });
        });
    }
};

module.exports = DXTodoItem;
