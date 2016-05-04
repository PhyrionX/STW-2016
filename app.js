/**
 * Rubén Gabás Celimendiz 590738
 *
 * app.js
 *
 * Inicio del servidor carga los componentes necesarios para la incialiazación del mismo
 * Conecta con la base de datos de mongo
 * Y establece las enpoints y recursos del sistema
 *
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    config = require('./server/config/config'),
    user = require('./server/controllers/userController'),
    nota = require('./server/controllers/notaController');

var app = express();
var mongoose = require('mongoose');

// puerto que utilizamos para el servidor
app.set('port', config.port);
// url de que utilizamos para lo conexión de la base de datos
app.set('dbUrl', config.db.test);
// connect mongoose to the mongo dbUrl
mongoose.connect(app.get('dbUrl'));

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.send(500, err.message);
});
//Configuramos express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// **************************************************************
//   API REST DE LA APP
// **************************************************************

//Zona pública

// recurso user
app.post("/api/user", user.login);

// recurso notas
app.get("/api/notas", nota.showAllMemo);
app.post("/api/notas", nota.setMemo);
app.get("/api/notas/:id", nota.showMemo);
app.delete("/api/notas/:id", nota.deleteMemo);

app.get('*', function(req, res){
  res.status(404).send('<h1>Url errónea</h1>');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

