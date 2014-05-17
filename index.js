var app  = require("express")();
var port = process.env['PORT'] || 8888;
var http = require('http');

require("./router")(app);

console.log("Server started on " + port);
http.createServer(app).listen(port);
