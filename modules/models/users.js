var db = require('./db');

module.exports= {
    insertUser: function (user, callback) {
        var collection = db.get().collection('users');

        collection.insert(user, function(err, documents){
            callback(err, documents);
        })
    },
    findByLogin: function (login, callback) {
        var collection = db.get().collection('users');

        collection.find({login: login}).toArray(function (err, rows) {
            //console.log(rows[0]);
            callback(err, rows);
        })
    }
}