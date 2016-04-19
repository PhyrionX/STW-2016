/**
 * Rubén Gabás Celimendiz 590738
 *
 * requestHandler.js
 *
 * Modulo inicial encargado de las funcionalidades de cada una de las routes del servidor.
 * Es la operativa del mismo
 *
 */

var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");
var crypto = require('crypto');
var mysql = require("./models/db");
var url = require("url");
var notas = require("./models/notas")

/**
 * Función que se encarga de mostrar todas las notas en una tabla
 * con su id, fecha, texto, archivo y las opciones de mostrar y borrar
 *
 * @param response
 */
function showAllMemo(response) {
    console.log("Request handler 'setMemo' was called.");
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body><h1>Agenda OP</h1>'+
        '<table>'+
        '<tr><th>Id</th><th>Fecha</th><th>Texto</th><th>Archivo</th><th>Options</th></tr>';
        mysql.show(function (rows) {
            for (i = 0; i < rows.length; i++) {
                //console.log(rows[i].id_notas+rows[i].fecha +rows[i].texto +rows[i].archivo );
                body += '<tr>';
                body += '<td>' + rows[i].id_nota + '</td>' +
                        '<td>' + rows[i].fecha + '</td>' +
                        '<td>' + rows[i].texto + '</td><td>';
                if (rows[i].fichero == null) {
                    body += 'No proporcionado';
                } else {
                    body += '<a href="' + rows[i].fichero + '">Fichero</a>';
                }
                body += '</td><td><a href="deleteMemo?id='+ rows[i].id_nota+'"> Borrar</a>' +
                    '<a href="showMemo?id='+ rows[i].id_nota+'"> Mostrar</a></td>'
                        '</tr>';
            }
            body += '</table></br></br>' +
                    '<form action="/setMemo" enctype="multipart/form-data" '+
                    'method="post">'+
                    '<input type="date" placeholder="Fecha ej: 12-05-1989" name="fecha" pattern="\\d{1,2}-\\d{1,2}-\\d{4}" required>'+
                    '<input type="text" placeholder="Texto memo" name="texto" required>'+
                    '<input type="file" name="upload" multiple="multiple">'+
                    '<input type="submit" value="Upload file" />'+
                    '</form>'+
                    '</body></html>'
            //console.log(body);
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(body);
            response.end();
        })


}

/**
 * Función encargada de insertar una nota a la lista la introduce a la BBDD
 * luego redirecciona a showAllMemo
 *
 * @param response
 * @param request
 */
function setMemo(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    console.log("about to parse");

    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        console.log(fields.texto + " " + fields.fecha);
        /* Possible error on Windows systems:
         tried to rename to an already existing file */
        if (files.upload.name != '') {
            //var buffer = new Buffer(getFilesizeInBytes(files));

            mysql.getMaxId(function(rows) {
                //guarda en el path único el archivo, en un sistema de ficheros
                // y esta ruta la guardamos en la BBDD
                var path = "./files/" + crypto.createHash('md5').update("" + rows[0].id_nota).digest("hex")  + files.upload.name;
                console.log(path);
                fs.rename(files.upload.path, path , function (error) {
                    if (error) {
                        console.log("Error");
                        fs.unlink(path);
                        fs.rename(files.upload.path, path);

                    } else {
                        var nota = {}
                        nota.fecha = fields.fecha;
                        nota.texto = fields.texto;
                        nota.path = path;
                        // inserción en la BBDD con ruta del archivo en la BBDD
                        notas.insertMemo(nota, function (err, documents) {
                            console.log(documents);
                        })
                        /*mysql.insertMemo(fields.fecha, fields.texto, path, function(rows) {
                            console.log(rows);
                        })*/
                    }
                });
            })

        } else {
            var nota = {}
            nota.fecha = fields.fecha;
            nota.texto = fields.texto;
            // inserción en la BBDD sin ruta del archivo en la BBDD
            notas.insertMemo(nota, function (err, documents) {
                console.log(documents);
            })
            /*mysql.insertMemo2(fields.fecha, fields.texto, function(rows) {
                console.log(rows);
            })*/
        }
        response.writeHead(302, {'Location': '/'});
        /*response.write("received image:<br/>");
        response.write("<img src='/show' />");*/
        response.end();
    });
}

/**
 * Borra una nota pasando el id de la misma por la url
 *
 * @param response
 * @param request
 */
function deleteMemo(response, request) {
    console.log("Request handler 'deleteMemo' was called.");
    // parseamos la url
    var parts = url.parse(request.url, true)
    console.log(parts.query.id);
    mysql.borrar(parts.query.id, function(err){
        console.log(err);
        response.writeHead(302, {'Location': '/'});
        response.end();
    })

}

/**
 * Muestra una nota pasando el id por la url
 *
 * @param response
 * @param request
 */
function showMemo(response, request) {
    console.log("Request handler 'showMemo' was called.");
    var parts = url.parse(request.url, true)
    console.log(parts.query.id);
    mysql.showById(parts.query.id, function(rows) {
        var body = '<html>'+
            '<head>'+
            '<meta http-equiv="Content-Type" '+
            'content="text/html; charset=UTF-8" />'+
            '</head>'+
            '<body>'+
                '<div><h1>Info nota -> ' + rows[0].id_nota + '</h1>' +
                '<dl><dt><b>Id</b></dt>' +
                '<dd>' + rows[0].id_nota +
                '</dd>' +
                '<dt><b>Fecha</b></dt>' +
                '<dd>' + rows[0].fecha +
                '</dd>' +
                '<dt><b>Texto</b></dt>' +
                '<dd>' + rows[0].texto +
                '</dd>' +
                '<dt><b>Fichero</b></dt><dd>';
                if (rows[0].fichero == null) {
                    body += 'No proporcionado';
                } else {
                    body += '<a href="' + rows[0].fichero + '">Fichero</a>';
                }
                body +='</dd>' +
                '</dl>' +
                '<a href="deleteMemo?id='+ rows[0].id_nota+'"> Borrar</a>' +
                '<a href="/"> Volver</a>'+
                '</div>'+
            '</body>' +
            '</html>';
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(body);
        response.end();
    })
}



exports.showMemo = showMemo;
exports.showAllMemo = showAllMemo;
exports.setMemo = setMemo;
exports.deleteMemo = deleteMemo;