var server = require("./modules/server");
var router = require("./modules/router");
var requestHandlers = require("./modules/requestHandlers");
var handle = {};
handle["/"] = requestHandlers.showAllMemo;
handle["/showAllMemo"] = requestHandlers.showAllMemo;
handle["/showMemo"] = requestHandlers.showMemo;
handle["/setMemo"] = requestHandlers.setMemo;
handle["/show"] = requestHandlers.show;
handle["/deleteMemo"] = requestHandlers.deleteMemo;


server.start(router.route, handle);