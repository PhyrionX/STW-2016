var formidable = require("formidable");
var users = require("../model/users")

module.exports = {
     login: function(req, res, next) {
         var form = new formidable.IncomingForm();

         console.log("about to parse");

         form.parse(req, function(error, fields, files) {
             if (fields.login != null && fields.pass != null) {
                 var user = {};
                 user.login = fields.login;
                 user.pass = fields.pass;
                 users.findByLogin(user.login, function (err, row) {
                     if (row == null) {
                         users.insertUser(user, function (err) {
                             res.status(200).json({error: false, message: "Login correctamente"});
                         })
                     } else {
                         if (user.pass == row.pass) {
                             res.status(200).json({error: false, message: "Login correctamente"});
                         } else {
                             res.status(200).json({error: true, message: "Login incorrecto"});
                         }
                     }
                 })
             } else {
                 res.status(200).json({error: false, message: "Login correctamente"});
             }
         })
    }
}