var http = require("http");x
// Defines a function that’ll handle incoming HTTP requests
function requestHandler(request, response) {
console.log("Incoming request to: " + request.url); 
 response.end("Hello, world!");
}

var server = http.createServer(requestHandler);

server.listen(3000);
