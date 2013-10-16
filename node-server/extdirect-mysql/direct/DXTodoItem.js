var table = 'todoitem';
var mysql = mySQL;

var DXTodoItem  = {
    create: function(params, callback){
        var conn = mysql.connect();
        delete params['id'];
        conn.query('INSERT INTO ' + table + ' SET ?', params, function(err, result) {

            if (err) throw err;

            conn.query('SELECT * FROM '  + table + ' WHERE id = ?', result.insertId, function(err, rows, fields) {
                mysql.disconnect(conn); //release connection
                callback({
                    success: true,
                    data: rows[0]
                });
            });
        });
    },

    //callback as last argument is mandatory
    read: function(params, callback){
        var conn = mysql.connect();

        var sql = 'SELECT * from ' + table;
        // this sample implementation supports 1 sorter, to have more than one, you have to loop and alter query
        if(params.sort){
            var s = params.sort[0];
            sql = sql + ' order by ' + conn.escape(s.property) +  ' ' + conn.escape(s.direction);
        }

        // Paging
        sql = sql + ' limit ' + conn.escape(params.start) + ' , ' + conn.escape(params.limit);

        conn.query(sql, function(err, rows, fields) {
            if (err) throw err;

            //get totals for paging

            var totalQuery = 'SELECT count(*) as totals from ' + table;

            conn.query(totalQuery, function(err, rowsTotal, fields) {
                mysql.disconnect(conn); //release connection
                if (err) throw err;

                callback({
                    success: true,
                    data: rows,
                    total: rowsTotal[0].totals
                });
            });
        });
    },

    update: function(params, callback){
        var conn = mysql.connect();

        conn.query('UPDATE ' + table + ' SET ? where id = ' + conn.escape(params['id']), params, function(err, result) {
            mysql.disconnect(conn); //release connection
            if (err) throw err;
            callback({success:true});
        });
    },

    destroy: function(params, callback){
        var conn = mysql.connect();

        conn.query('DELETE FROM ' + table + ' WHERE id = ?', conn.escape(params['id']), function(err, rows, fields) {
            if (err) throw err;

            mysql.disconnect(conn); //release connection
            callback({
                success:rows.affectedRows === 1, //if row successfully removed, affected row will be equal to 1
                id:params['id']
            });
        });
    }
};

module.exports = DXTodoItem;