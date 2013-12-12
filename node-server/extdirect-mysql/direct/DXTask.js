var table = 'tasks';
var db = global.App.database;

var DXTask  = {
    create: function(params, callback){
        var conn = db.connect();
        delete params['id'];
        conn.query('INSERT INTO ' + table + ' SET ?', params, function(err, result) {

            if (err) db.debugError(callback, err);

            conn.query('SELECT * FROM '  + table + ' WHERE id = ?', result.insertId, function(err, rows, fields) {
                db.disconnect(conn); //release connection
                callback({
                    success: true,
                    data: rows[0]
                });
            });
        });
    },

    //callback as last argument is mandatory
    read: function(params, callback){
        var conn = db.connect();

        var sql = 'SELECT * FROM ' + table,
            where = '';

        //filtering. this example assumes filtering on 1 field, as multiple field where clause requires additional info e.g. chain operator

        if(params.filter){
            where = " WHERE `"+ params.filter[0].property  + "` LIKE '%" + params.filter[0].value + "%'"; // set your business logic here to perform advanced where clause
            sql += where;
        }

        // this sample implementation supports 1 sorter, to have more than one, you have to loop and alter query
        if(params.sort){
            var s = params.sort[0];
            sql = sql + ' ORDER BY ' + conn.escape(s.property) +  ' ' + conn.escape(s.direction);
        }

        // Paging
        sql = sql + ' LIMIT ' + conn.escape(params.start) + ' , ' + conn.escape(params.limit);

        conn.query(sql, function(err, rows, fields) {
            if (err) db.debugError(callback, err);

            //get totals for paging

            var totalQuery = 'SELECT count(*) as totals from ' + table + where;

            conn.query(totalQuery, function(err, rowsTotal, fields) {
                db.disconnect(conn); //release connection
                if (err) db.debugError(callback, err);

                callback({
                    success: true,
                    data: rows,
                    total: rowsTotal[0].totals
                });
            });
        });
    },

    update: function(params, callback){
        var conn = db.connect();

        conn.query('UPDATE ' + table + ' SET ? where id = ' + conn.escape(params['id']), params, function(err, result) {
            db.disconnect(conn); //release connection
            if (err) db.debugError(callback, err);
            callback({success:true});
        });
    },

    destroy: function(params, callback){
        var conn = db.connect();

        conn.query('DELETE FROM ' + table + ' WHERE id = ?', conn.escape(params['id']), function(err, rows, fields) {
            if (err) db.debugError(callback, err);

            db.disconnect(conn); //release connection
            callback({
                success:rows.affectedRows === 1, //if row successfully removed, affected row will be equal to 1
                id:params['id']
            });
        });
    }
};

module.exports = DXTask;