console.log('This is index.js');

var server = require("./server");
var router = require("./router");
var requestHandlers = require('./requestHandlers');

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/uploadTest"] = requestHandlers.uploadTest;

server.start(router.route, handle);