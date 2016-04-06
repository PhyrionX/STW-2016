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
        connection.query('SELECT * FROM notas WHERE id_nota=' + id, function (err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    },
    getMaxId: function(callback) {
        connection.query('SELECT max(id_nota) AS id_nota FROM notas', function (err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    },
    insertMemo: function(fecha, texto, ruta, callback) {
        //var sql = 'INSERT INTO exhibits (title) VALUES ("fecha")';
        connection.query('INSERT INTO notas (fecha, texto, fichero) VALUES ("' + fecha + '", "' + texto + '", "' + ruta + '")', function(err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    },
    insertMemo: function(fecha, texto, callback) {
        //var sql = 'INSERT INTO exhibits (title) VALUES ("fecha")';
        connection.query('INSERT INTO notas (fecha, texto) VALUES ("' + fecha + '", "' + texto + '")', function(err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    }
}
