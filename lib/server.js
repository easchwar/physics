var static = require('node-static');

// Create a node-static server instance to serve the './public' folder

// serves index.html by default
var file = new static.Server('./public');
var port = 3000;

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(port);

console.log("Listening on port " + port);
