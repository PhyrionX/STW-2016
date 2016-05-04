/**
 * Rubén Gabás Celimendiz 590738
 *
 * users.js
 *
 * Módulo encargado funciones sobre la base de datos de la collección
 * users
 */

var User = require('./models').User;

module.exports= {
    insertUser: function (user, callback) {
        var newUser = new User(user);
        newUser.save(function(err){
            callback(err);
        });
    },
    findByLogin: function (_login, callback) {
        User.findOne({login: _login}, function(err, user) {
            callback(err, user);
        })
    }
}