/*
* AUTOR: Rubén Gabés Celimendiz
* NIA: 590738
* FICHERO: Main.java
* DESCRIPCIÓN: Es la clase encargada de la inicialización del servidor
*              multihilo.
*/
package server;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class Main {

    public static void main(String[] args) throws IOException {
        try {
            ServerSocket ss = new ServerSocket(9000);
            // Bucle de generación de hilos
            while (true) {
                System.out.println("Esperando conexiones...");
                Socket socket = ss.accept();
                System.out.println("Conexion aceptada");
                MultiThreadHTTPServer ws = new MultiThreadHTTPServer(socket);
                ws.start();
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
}
