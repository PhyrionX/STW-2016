/**
 * Rubén Gabás Celimendiz 590738
 *
 * users.js
 *
 * Módulo encargado funciones sobre la base de datos de la collección
 * users
 */

var Nota = require('./models').Nota;

module.exports= {
    show: function (callback) {
        Nota.find({}, function(err, nota) {
            callback(err, nota);
        });
    },
    insertMemo: function (nota, callback) {
        var newNota = new Nota(nota);
        newNota.save(nota, function(err, document){
            callback(err, document);
        })
    },
    showMemo: function (oid, callback) {
        Nota.findById(oid, function(err, nota) {
            callback(err, nota);
        });
    },
    deleteMemo: function (oid, callback) {
        Nota.remove({_id: oid}, (function (err, nota) {
                callback(err, nota);
            })
        )
    }
}