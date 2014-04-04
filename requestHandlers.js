console.log('This is requestHandlers.js');

var exec = require("child_process").exec;

function start(){
	console.log("Request handler 'start' was called");
	var content = "empty";

	//non-blocking 방식 예상대로라면 리스트가 나와야 하지만 모두 가리고 아래가 empty 가 실행된다.
	exec("ls -lah", function(error, stdout, stderr){
		content = stdout;
	});

	/*
	function sleep(milliSecnds){
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSecnds);
	}
	sleep(10000);
	*/
	return content;
}

function upload(){
	console.log("Request handler 'upload' was called");
	return "Hello upload";
}

exports.start = start;
exports.upload = upload;

