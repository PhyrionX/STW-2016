/**
 * Rubén Gabás Celimendiz 590738
 *
 * notas.js
 *
 * Módulo encargado funciones sobre la base de datos de la collección
 * notas
 */
var db = require('./db');

module.exports= {
    show: function (callback) {
        var collection = db.get().collection('notas');

        collection.find().toArray(function (err, rows) {
            callback(err, rows);
        })
    },
    insertMemo: function (nota, callback) {
        var collection = db.get().collection('notas');

        collection.insert(nota, function(err, documents){
            callback(err, documents);
        })
    },
    showMemo: function (oid, callback) {
        var oid = db.getOID(oid);
        var collection = db.get().collection('notas');

        collection.find({_id: oid}).toArray(function (err, rows) {
            console.log(rows[0]);
            callback(err, rows);
        })
    },
    deleteMemo: function (oid, callback) {
        var oid = db.getOID(oid);
        var collection = db.get().collection('notas');

        collection.remove({_id: oid}, (function (err) {
            callback(err);
            })
        )
    }
}