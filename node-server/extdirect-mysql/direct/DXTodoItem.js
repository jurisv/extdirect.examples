var table = 'todoitem';
var mysql = mySQL;

var DXTodoItem  = {
    create: function(params, callback){
        var conn = mysql.connect();
        delete params['id'];
        conn.query('INSERT INTO ' + table + ' SET ?', params, function(err, result) {
            if (err) throw err;

            conn.query('SELECT * FROM '  + table + ' WHERE id = ?', result.insertId, function(err, rows, fields) {

                callback(rows);

                mysql.disconnect(conn); //always disconnect
            });
        });
    },

    //callback as last argument in mandatory
    read: function(params, callback){
        var conn = mysql.connect();

        var sql = 'SELECT * from ' + table;
        // this sample implementation supports 1 sorter, to have more than one, you have to loop and alter query
        if(params.sort){
            var s = params.sort[0];
            sql = sql + ' order by ' + s.property +  ' ' + s.direction;
        }

        // Paging
        sql = sql + ' limit ' + params.start + ' , ' + params.limit;

        conn.query(sql, function(err, rows, fields) {
            if (err) throw err;

            //ST2.1 List / Dataview response
            callback(rows);
        });

        mysql.disconnect(conn); //always disconnect
    },

    update: function(params, callback){
        var conn = mysql.connect();

        conn.query('UPDATE ' + table + ' SET ? where id = ' + conn.escape(params['id']), params, function(err, result) {
            if (err) throw err;
            callback({success:true});
        });
        mysql.disconnect(conn); //always disconnect
    },

    destroy: function(params, callback){
        var conn = mysql.connect();

        conn.query('DELETE FROM ' + table + ' WHERE id = ?', params['id'], function(err, rows, fields) {
            callback({success:true, id:params['id']});
        });
        mysql.disconnect(conn); //always disconnect
    }
};

module.exports = DXTodoItem;