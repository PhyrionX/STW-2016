/**
 * Rubén Gabás Celimendiz 590738
 *
 * mysqlConnection.js
 *
 * Módulo encargado de conectarse a la BBDD de MYSQL y realizar las consultas sobre la misma
 *
 */

var mysql      = require('mysql');

// parametros de conexión a mi BBDD local
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'memo'
});

connection.connect();

// Se exportan las funciones que se requieren utilizar  por otros módulos
module.exports = {
    // Muestra todas las notas del campo notas
    show: function (callback) {
        connection.query('SELECT * FROM notas', function(err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    },
    // Borra una nota por id
    borrar: function (id, callback) {
        connection.query('DELETE FROM notas WHERE id_nota=' + id, function (err) {
            if (err) throw err;
            callback ();
        })
    },
    // Muestra una nota por id
    showById: function(id, callback) {
        connection.query('SELECT * FROM notas WHERE id_nota=' + id, function (err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    },
    // Saca el máximo id de la BBDD lo utilizo para crear un MD5 para guardar los archivos
    getMaxId: function(callback) {
        connection.query('SELECT max(id_nota) AS id_nota FROM notas', function (err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    },
    // Se inserta una nota con ruta de un fichero al que acceder
    insertMemo: function(fecha, texto, ruta, callback) {
        //var sql = 'INSERT INTO exhibits (title) VALUES ("fecha")';
        connection.query('INSERT INTO notas (fecha, texto, fichero) VALUES ("' + fecha + '", "' + texto + '", "' + ruta + '")', function(err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    },
    // Se inserta una nota sin ruta de un fichero al que acceder
    insertMemo2: function(fecha, texto, callback) {
        //var sql = 'INSERT INTO exhibits (title) VALUES ("fecha")';
        connection.query('INSERT INTO notas (fecha, texto) VALUES ("' + fecha + '", "' + texto + '")', function(err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    }
}
