var collectionName = 'satask';
var mongoDB = global.App.database;

var Task  = {
    create: function(params, callback) {
        mongoDB.execute(function(collection){
                collection.insert(params, {w:1}, function(err, result) {
                    if (err) {
                        mongoDB.debugError(err, callback);
                    }else{

                        mongoDB.close();
                        callback(null, {
                            data: result
                        });
                    }
                });
            }, collectionName
        );
    },

    read: function(params, callback){
        var response = {
            data: [],
            total: 0
        };

        var filter = {};
        var options = {};

        if (params.limit) {
            options.skip = params.start;
            options.limit = params.limit;
        }

        if (params.sort) {
            var arr = [],
                sort = [],
                current,
                i = 0,
                len = params.sort.length;

            for (; i < len; i++) {
                current = params.sort[i];
                sort.push(current.property);
                sort.push(current.direction === 'DESC' ? 'descending' : 'ascending');
                arr.push(sort);
            }
            options.sort = arr;
        }

        //Filtering in mongoDb is done via RegExp, so you can pass values as valid expression
        if(params.filter){
            for(i = 0; i < params.filter.length; i++){
                filter[params.filter[i].property] = new RegExp(params.filter[i].value);
            }

        }

        mongoDB.execute(function(collection){
                collection.count(filter, function(err, count) {
                    if (err) {
                        mongoDB.debugError(err, callback);
                    }else{
                        if(count === 0){
                            if (err) {
                                mongoDB.debugError(err, callback);
                            }else{
                                mongoDB.close();
                                callback(null, response);
                            }
                        }else{
                            collection.find(filter, options).toArray(function(err, docs) {
                                if (err) {
                                    mongoDB.debugError(err, callback);
                                }else{
                                    mongoDB.close();
                                    response.data = docs;
                                    response.total = count;
                                    callback(null, response);
                                }
                            });
                        }
                    }
                });
            }, collectionName
        );
    },

    update: function(params, callback){
        mongoDB.execute(function(collection){
                collection.update({_id: mongoDB.getId(params.id)}, params, {upsert: true, w: 1}, function(err, result) {
                    if (err) {
                        mongoDB.debugError(err, callback);
                    }else{

                        mongoDB.close();
                        callback();
                    }
                });
            }, collectionName
        );
    },

    destroy: function(params, callback){
        mongoDB.execute(function(collection){
                collection.remove({_id: mongoDB.getId(params.id)}, {w:1}, function(err, numberOfRemovedDocs) {
                    if (err) {
                        mongoDB.debugError(err, callback);
                    }else{

                        mongoDB.close();
                        callback(null, {
                            success: numberOfRemovedDocs === 1,
                            id: params.id
                        });
                    }
                });
            }, collectionName
        );
    }
};

module.exports = Task;