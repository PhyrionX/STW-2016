/*
* AUTOR: Rubén Gabés Celimendiz
* NIA: 590738
* FICHERO: Peticion.java
* DESCRIPCIÓN: Clase encargada de generar la respuesta para el cliente.
*/
package server;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

public class Peticion {

    /**
     * Función encargada de retornar una variable tipo byte
     * con los datos del fichero o archivo que vamos a abrir con
     * nuestro servidor http.
     *
     * Se llama a esta función una vez que sabemos que la petición del
     * cliente es correcta y el archivo solicitado existe.
     *
     * Comprobamos el tipo de fichero a leer y retornamos la variable.
     *
     * @param fichero
     * @return
     * @throws IOException
     */
    public byte[] httpRespondOk(File fichero) throws IOException {
        String path = fichero.getPath().toLowerCase();
        String tipo;
        byte bytesFichero[];
        byte bytesCabecera[];
        if (path.endsWith(".html") || path.endsWith(".htm")) {
            tipo = "text/html;charset=UTF-8";
        } else if (path.endsWith(".txt")) {
            tipo = "text/plain;charset=UTF-8";
        } else if (path.endsWith(".gif")) {
            tipo = "image/gif";
        } else {
            tipo = "application/octet-stream";
        }

        bytesFichero = Files.readAllBytes(fichero.toPath());
        bytesCabecera =
                ("HTTP/1.0 200 OK\n" +
                        "Content-Type: " + tipo + "\n" +
                        "Content-Length: " + bytesFichero.length + "\n\n").getBytes();


        byte response[] = new byte[bytesCabecera.length + bytesFichero.length];
        System.arraycopy(bytesCabecera, 0, response, 0, bytesCabecera.length);
        System.arraycopy(bytesFichero, 0, response, bytesCabecera.length, bytesFichero.length);
        return response;
    }


    /**
     * Este metodo se encarga de generar el http segun el tipo
     * fallo que hallamos recibido en la petición
     * @param type
     * @return
     * @throws IOException
     */
    public byte[] httpRespond(String type) throws IOException {
        String respuesta = "";
        String path = "";
        String mensaje = "";
        boolean ok = false;
        switch (type) {
            case Constants.NOT_FOUND:
                respuesta += "HTTP/1.1 404 NOT FOUND\n";
                mensaje = "<html><body><h1>404 NOT FOUND</h1></body></html>";
                break;
            case Constants.BAD_REQUEST:
                respuesta += "HTTP/1.1 400 BAD REQUEST\n";
                mensaje = "<html><body><h1>400 BAD REQUEST</h1></body></html>";
                break;
            case Constants.FORBBIDEN:
                respuesta = "HTTP/1.1 403 FORBIDDEN\n";
                mensaje = "<html><body><h1>403 NOT FORBIDDEN</h1></body></html>";
                break;
            case "internalerror":
                respuesta = "HTTP/1.1 500 INTERNAL ERROR\n";
                mensaje = "<html><body><h1>500 INTERNAL ERROR</h1></body></html>";
                break;
            case Constants.NOT_IMPLEMENTED:
                respuesta = "HTTP/1.1 501 NOT IMPLEMENTED\n";
                mensaje = "<html><body><h1>501 NOT IMPLEMENTED</h1></body></html>";
                break;
        }

        respuesta += "Content-Type: text/html\n";
        respuesta += "Content-Length: " + mensaje.length() + "\n\n";
        respuesta += mensaje;
        return respuesta.getBytes();
    }


}