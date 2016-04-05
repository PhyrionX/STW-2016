var server = require("./modules/server");
var router = require("./modules/router");
var requestHandlers = require("./modules/requestHandlers");
var handle = {};
handle["/"] = requestHandlers.showAllMemo;
handle["/setMemo"] = requestHandlers.showAllMemo;
handle["/showMemo"] = requestHandlers.showMemo;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/deleteMemo"] = requestHandlers.deleteMemo;


server.start(router.route, handle);