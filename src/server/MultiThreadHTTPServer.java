/*
* AUTOR: Rubén Gabés Celimendiz
* NIA: 590738
* FICHERO: MultiThreadHTTPServer.java
* DESCRIPCIÓN: Clase encargada del funcionamiento del servidor http
*              es cada hilo del servidor multihilo.
*/
package server;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;
import java.util.Scanner;


public class MultiThreadHTTPServer extends Thread{
    private Socket socket;
    private Scanner entrada;
    private OutputStream salida;
    private Peticion peticion = new Peticion();

    public MultiThreadHTTPServer(Socket socket) {
        this.socket = socket;
    }

    /**
     * Hilo encargado del funcionamiento del servidor,
     * se encarga de analizar la la petición del cliente y conseguir los parametros
     * que requerimos.
     *
     * Mi servidor multhilo funciona en localhost:9000/www/...
     *
     * www es el directorio raíz del servidor
     */
    public void run () {
        try {
            // directorio raíz
            String root = "www/";

            // lector de entrada
            entrada = new Scanner(socket.getInputStream());
            // escritor
            salida = socket.getOutputStream();

            String lineaInicial = entrada.nextLine();
            // Se comprueba si la petición es del tipo get
            if (lineaInicial.startsWith("GET")) {
                // formateamos la petición del cliente para obtener los parametros
                // que necesitamos
                // partes[0] es el metodo
                // partes[1] es el objeto
                // partes[2] es el protocolo
                String[] partes = lineaInicial.split(" ");

                if (protocoloNoSoportado(partes[2])) {
                    salida.write(peticion.httpRespond(Constants.NOT_IMPLEMENTED));
                } else if (rutaInvalida(partes[1])) {
                    salida.write(peticion.httpRespond(Constants.BAD_REQUEST));
                } else {
                    String ruta = partes[1].substring(1);

                    File fichero = new File(ruta).getCanonicalFile();
                    // Se comprueba si se intenta acceder a zonas prohibidas del servidor
                    if (!fichero.getPath().contains(root + ruta)) {
                        salida.write(peticion.httpRespond(Constants.FORBBIDEN));
                    } else {
                        if (fichero.exists()) {
                            salida.write(peticion.httpRespondOk(fichero));
                        } else {
                            salida.write(peticion.httpRespond(Constants.NOT_FOUND));
                        }
                    }
                }
            } else {
                salida.write(peticion.httpRespond(Constants.NOT_IMPLEMENTED));
            }
            socket.close();
        } catch (IOException ex) {
            System.out.println(ex);
        }
    }

    /**
     * Función que comprueba que el protocolo es soportado
     * @param protocolo
     * @return
     */
    private boolean protocoloNoSoportado(String protocolo) {
        return !protocolo.equalsIgnoreCase("HTTP/1.0")
                && !protocolo.equalsIgnoreCase("HTTP/1.1");
    }

    /**
     * Función que comprueba una ruta válida
     * @param fichero
     * @return
     */
    private boolean rutaInvalida(String fichero) {
        return !fichero.startsWith("/");
    }

}