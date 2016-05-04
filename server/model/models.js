/**
 * models.js
 *
 * Aqui se declararan todos los modelos de
 * nuestra app
 *
 * @type {*|exports|module.exports}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// define the userSchema
var userSchema = new Schema({
    login: {type: String, require: true, unique: true},
    pass: {type: String, require: true},
});

var notaSchema = new Schema({
    fecha: {type: String, require: true},
    texto: {type: String, require: true},
    path: {type: String}
})

// Export the User model
exports.User = mongoose.model('users', userSchema);
exports.Nota = mongoose.model('notas', notaSchema);

