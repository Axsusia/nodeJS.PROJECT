console.log('This is index.js');

var server = require("./server");
var router = require("./router");
var requestHandlers = require('./requestHandlers');

var handle = {};
handle["/"] = reqeustHandlers.start;
handle["/start"] = reqeustHandlers.start;
handle["/upload"] = reqeustHandlers.upload;

server.start(router.route, handle);