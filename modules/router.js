/**
 * Rubén Gabás Celimendiz 590738
 *
 * router.js
 *
 * Modulo encargado de gestionar los endpoints o rutas válidas para el servidor,
 * en mi servidor son válidas las rutas de tipo function que son las que tienen asociada
 * una función dentro de requestHandlers y las rutas sobre el directorio /file que son donde
 * se guardan los archivos fotos etc..
 */

/**
 * Comprueba que las rutas son validas
 *
 * @param handle
 * @param pathname
 * @param response
 * @param request
 */
function route(handle, pathname, response, request) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    } else if (pathname.startsWith("/files")) { // si se cumple recuperamos el archivo para descargarlo
        var stream = fs.createReadStream("." + pathname);

        stream.on('open', function() {
            response.writeHead(200, {"Content-Type": "application/octet-stream"});
            stream.pipe(response);
        });
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Not found");
        response.end();
    }
}
exports.route = route;