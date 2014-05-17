var port        = process.env['PORT'] || 8888;
var http        = require('http');
var app         = require("express")()
var contollers  = require("./controllers");

app.get("/api/feed", contollers.feed.index);
app.get("/api/route/:route_id", contollers.route.get)
app.get("/api/feed/near", contollers.feed.near);

console.log("Server started on " + port);
http.createServer(app).listen(port);
