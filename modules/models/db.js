/**
 * Rubén Gabás Celimendiz 590738
 *
 * mysqlConnection.js
 *
 * Módulo encargado de conectarse a la BBDD de MYSQL y realizar las consultas sobre la misma
 *
 */
var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;


var state = {
    db: null,
}

// Se exportan las funciones que se requieren utilizar  por otros módulos
module.exports = {
    connect: function(url, done) {
        if (state.db) return done()

        MongoClient.connect(url, function(err, db) {
            if (err) return done(err)
            state.db = db
            done()
        })
    },
    get: function() {
        return state.db
    },
    getOID : function (objectID) {
        var o_id = new Mongo.ObjectID(objectID);
        return o_id;
    },
    close: function(done) {
        if (state.db) {
            state.db.close(function(err, result) {
                state.db = null
                state.mode = null
                done(err)
            })
        }
    }
}
