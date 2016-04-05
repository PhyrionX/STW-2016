var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

var mysql = require("./mysqlConnection");
var url = require("url");



function showAllMemo(response) {
    console.log("Request handler 'setMemo' was called.");
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
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
            body += '</table>' +
                    '<form action="/upload" enctype="multipart/form-data" '+
                    'method="post">'+
                    '<input type="text" name="texto">'+
                    '<input type="date" name="fecha">'+
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
function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        //var buffer = new Buffer(getFilesizeInBytes(files));
        /* Possible error on Windows systems:
         tried to rename to an already existing file */
        fs.rename(files.upload.path, "/tmp/test.png", function(error) {
            if (error) {
                fs.unlink("/tmp/test.png");
                fs.rename(files.upload.path, "/tmp/test.png");

            }
        });
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

function deleteMemo(response, request) {
    console.log("Request handler 'deleteMemo' was called.");
    var parts = url.parse(request.url, true)
    console.log(parts.query.id);
    mysql.borrar(parts.query.id, function(err){
        console.log(err);
        response.writeHead(302, {'Location': '/'});
        response.end();
    })

}
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

function show(response) {
    console.log("Request handler 'show' was called.");
    response.writeHead(200, {"Content-Type": "image/png"});
    fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.showMemo = showMemo;
exports.showAllMemo = showAllMemo;
exports.upload = upload;
exports.deleteMemo = deleteMemo;
exports.show = show;