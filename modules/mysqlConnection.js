var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'memo'
});

connection.connect();

module.exports = {
    show: function (callback) {
        connection.query('SELECT * FROM notas', function(err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    },
    borrar: function (id, callback) {
        connection.query('DELETE FROM notas WHERE id_nota=' + id, function (err) {
            if (err) throw err;
            callback ();
        })
    },
    showById: function(id, callback) {
        connection.query('SELECT * FROM notas WHERE id_nota=' + id, function(err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    }
}
