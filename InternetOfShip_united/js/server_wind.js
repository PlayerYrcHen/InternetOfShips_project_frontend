var http = require("http");
var fs = require("fs");

var str='{"id":"123",name:"jack",arg:11111}';
function jsonResolver(geojson) {
    
}
function onRequest(request, response){
  console.log("Request received.");
  response.writeHead(200,{"Content-Type":'text/plain',
  'charset':'utf-8','Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
  str=fs.readFileSync('../jsonfile/winds.json');
  response.write(str);
  response.end();
}

http.createServer(onRequest).listen(8088);

console.log("Server has started.port on 8088\n");
// console.log("test data: "+str.toString());