var db = require('./db');

module.exports= {
    show: function (callback) {
        var collection = db.get().collection('notas');

        collection.find().toArray(function (err, docs) {
            callback(err, docs)
        })
    },
    insertMemo: function (nota, callback) {
        var collection = db.get().collection('notas');

        collection.insert(nota, function(err, documents){
            console.dir(documents);
        })
    }
}