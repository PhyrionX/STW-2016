/**
 * Rubén Gabás Celimendiz 590738
 *
 * server.js
 *
 * Módulo encargado de iniciar el servidor, el servidor corre en el puerto 8888
 *
 */

var http = require("http");
var url = require("url");

var db = require('./models/db')

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request);
    }
    db.connect('mongodb://localhost:27017/mydatabase', function(err) {
        if (err) {
            console.log('Unable to connect to Mongo.')
            process.exit(1)
        } else {
            http.createServer(onRequest).listen(8888);
            console.log("Server has started.");
        }
    })

}
exports.start = start;


