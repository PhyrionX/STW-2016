/**
 * Rubén Gabás Celimendiz 590738
 *
 * index.js
 *
 * Modulo inicial encargado de asociar los handle -> direcciones del servidor
 * a requestHandler las funciones con la operativa del servidor
 */
var server = require("./modules/server");
var router = require("./modules/router");
var requestHandlers = require("./modules/requestHandlers");
var handle = {};
handle["/"] = requestHandlers.showAllMemo;
handle["/showAllMemo"] = requestHandlers.showAllMemo;
handle["/showMemo"] = requestHandlers.showMemo;
handle["/setMemo"] = requestHandlers.setMemo;
handle["/deleteMemo"] = requestHandlers.deleteMemo;


server.start(router.route, handle);