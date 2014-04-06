console.log('This is requestHandlers.js');

var querystring = require("querystring");
var exec = require("child_process").exec;
var fs = require("fs");
var formidable = require("formidable");
var expess = require("express");
/*
	fs 는 이미지 업로드를 하기 위해서 필요하다.
	fs 는 외부 모듈로 따로 설치를 해주어야 한다.
	npm install formidable

	// 성공이라면 아래와 같이 나온다.
	npm info build Success: formidable@ver
	npm ok

	우분투 에러시
	http://stackoverflow.com/questions/12913141/installing-from-npm-fails
*/

function start(response){//postData
	console.log("Request handler 'start' was called");
	/*
	function sleep(milliSecnds){
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSecnds);
	}
	sleep(10000);
	//return content;
	*/
	//var content = "empty";
	//non-blocking 방식 예상대로라면 리스트가 나와야 하지만 모두 가리고 아래가 empty 가 실행된다.
	/*
	exec("ls -lah", function(error, stdout, stderr){
		response.writeHead(200,{"Content-Type":"text/plain"});
		response.write(stdout);
		response.end();
	});
	*/
	/*
	exec("find /",
		{timeout:10000, maxBuffer:20000*1024},
		function(error, stdout, stderr){
			response.writeHead(200,{"Content-Type":"text/plain"});
			response.write(stdout);
			response.end();	
		});
	
	console.log("start call end===================-");
	*/

	var body = '' +
		'<html>' +
		'<head>' + 
			'<meta http-equiv="Content-Type" content="text/html;charest=utf-8" />' +
		'</head>' +
		'<body>' +
			/*
			'<form action="upload" method="post">' +
			'<textarea name="test" rows="20" cols="60"></textarea>' +
			'<input type="submit" value="submit test" />' + 
			'</form>' +
			*/
			'<form action="/upload" enctype="multpart/form-data" method="post">' +
			'<input type="file" name="upload">' +
			'<input type="submit" value="Upload file">' +
			'' +
			'' +
			'</form>' +
		'</body>' +
		'</html>';

	response.writeHead(200, {"Content-Type":"text/html"});
	response.write(body);
	response.end();

}

function upload(response, request){//postData
	console.log("Request handler 'upload' was called");

	var form = new formidable.IncomingForm();

	console.log("about parse");
	form.parse(request, function(error, fields, files){
		console.log('----');
		try{
			files.upload.path = "./tmp/";
			fs.renameSync(files.upload.path, "./seosiwon.png");
		}catch(e){
			console.log(e);
		}
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write("receive image : <br/>");
		response.write("<img src='/show' />");
		response.end();
	});

	/*
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("Hello Upload");
	response.write("You've sent : " + querystring.parse(postData).text + " / " + postData);
	response.end();
	//return "Hello upload";
	*/
}


function show(response){//postData
	console.log("Request handler 'show' was colled");

	fs.readFile("./seosiwon.png","binary", function(error, file){
		if(error){
			response.writeHead(500, {"Content-Type":"text/plain"});
			response.write(error + "\n");
			response.end();
		}else{
			response.writeHead(200, {"Content-Type":"image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}


function uploadTest(response, request){
	response.writeHead(200, {"Content-Type":"image/png"});
	response.write("its uploadTest <<!", "binary");
	response.end();
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.uploadTest = uploadTest;
