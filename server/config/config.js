/**
 * Rubén Gabás Celimendiz 590738
 *
 * config.js
 *
 * Archivo de configuración
 * consta del puerto y la url de la base de datos
 * @type {{db: {test: string}, port: string}}
 */
module.exports = {
    db: {
        test:"mongodb://localhost:27017"
    },
    port: "8080"
}